use tauri::utils::config::Csp;

#[derive(Debug)]
pub struct ContentSecurity {
    pub policy: Option<Csp>,
}

impl ContentSecurity {
    #[allow(dead_code)]
    pub fn new(csp: String) -> Self {
        let policy_string = Csp::Policy(csp);
        ContentSecurity {
            policy: Some(policy_string),
        }
    }
}

impl Default for ContentSecurity {
    fn default() -> Self {
        ContentSecurity {
            policy: Some(Csp::Policy(
                "default-src 'self'; connect-src 'self' ipc://localhost http://icp.localhost http://localhost"
                    .to_string(),
            )),
        }
    }
}
