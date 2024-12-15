use std::sync::{Arc, Mutex};
use sysinfo::{Pid, System};
use tauri::{Manager, RunEvent};
use tauri_plugin_shell::process::CommandEvent;
use tauri_plugin_shell::ShellExt;

mod port_manager;
use crate::port_manager::PortManager;

#[derive(Clone, serde::Serialize)]
struct AppData {
    backend_api_port: u16,
}

#[tauri::command]
async fn get_port(state: tauri::State<'_, AppData>) -> Result<u16, ()> {
    Ok(state.backend_api_port)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let child_mutex = Arc::new(Mutex::new(None));
    let child_mutex_clone = child_mutex.clone();

    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![get_port])
        .setup(move |app| {
            // in dev mode open devtools by default
            #[cfg(debug_assertions)]
            {
                use tauri::Manager;
                let window = app.get_webview_window("main").unwrap();
                window.open_devtools();
            }

            // init the python sidecar
            let sidecar_command = app.shell().sidecar("taupy-pyserver").unwrap();

            // generate an available port for the python sidecar
            let port_manager = PortManager::default();
            let port = port_manager
                .find_available_port()
                .expect("no available port found");
            let sidecar_command = sidecar_command.arg("--port").arg(port.to_string());
            app.manage(AppData {
                backend_api_port: port,
            });

            // make sidecar aware of dev mode
            #[cfg(debug_assertions)]
            let sidecar_command = sidecar_command.arg("--dev");

            // send devserver url in dev mode
            let dev_url = app
                .config()
                .build
                .dev_url
                .clone()
                .expect("no devURL is set in tauri.conf.json");
            #[cfg(debug_assertions)]
            let sidecar_command = sidecar_command.arg("--devurl").arg(
                dev_url
                    .as_str()
                    .strip_suffix("/")
                    .unwrap_or(dev_url.as_str()),
            );

            // print the entire start command to the console in dev
            #[cfg(debug_assertions)]
            println!("starting python backend with: {:?}", sidecar_command);

            let (mut rx, child) = sidecar_command.spawn().expect("failed to spawn sidecar");
            // store the child in the mutex
            *child_mutex_clone.lock().unwrap() = Some(child);
            // print py output to rust console
            tauri::async_runtime::spawn(async move {
                while let Some(event) = rx.recv().await {
                    match event {
                        CommandEvent::Stdout(line) => {
                            print!("py out: {}", String::from_utf8_lossy(&line))
                        }
                        CommandEvent::Stderr(line) => {
                            print!("py err: {}", String::from_utf8_lossy(&line))
                        }
                        _ => {}
                    }
                }
            });
            Ok(())
        })
        .build(tauri::generate_context!())
        .expect("error while building tauri application")
        .run(move |_app_handle, event| match event {
            RunEvent::Exit {} => {
                if let Some(child) = child_mutex.lock().unwrap().take() {
                    let mut system = System::new_all();
                    system.refresh_all();
                    // find and kill the main process and its children
                    if let Some(process) = system.process(Pid::from(child.pid() as usize)) {
                        let exe_path = process.exe();
                        // kill the specific process first
                        process.kill();
                        // find and kill any related processes
                        for (_, p) in system.processes() {
                            if p.exe() == exe_path {
                                p.kill();
                            }
                        }
                    }
                }
                println!("exiting python backend...")
            }
            _ => {}
        });
}
