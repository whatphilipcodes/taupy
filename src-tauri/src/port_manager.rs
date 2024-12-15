use std::net::TcpListener;

#[derive(Debug)]
pub struct PortManager {
    start_port: u16,
    max_attempts: u16,
}

impl PortManager {
    #[allow(dead_code)]
    pub fn new(start_port: u16, max_attempts: u16) -> Self {
        PortManager {
            start_port,
            max_attempts,
        }
    }

    pub fn find_available_port(&self) -> Option<u16> {
        for port in self.start_port..(self.start_port + self.max_attempts) {
            if TcpListener::bind(format!("127.0.0.1:{}", port)).is_ok() {
                return Some(port);
            }
        }
        None
    }
}

impl Default for PortManager {
    fn default() -> Self {
        PortManager {
            start_port: 8000,
            max_attempts: 100,
        }
    }
}
