use serde::Deserialize;

#[derive(Debug, Deserialize)]
pub struct Metadata {
    // pub name: String,
    pub backend_identifier: String,
    // pub bundle_identifier: String,
    // pub version: String,
    // pub authors: Vec<String>,
    // pub description: String,
    // pub repository: String,
    // pub readme: String,
    // pub license: String,
}

impl Metadata {
    pub fn load() -> Self {
        let metadata_str = include_str!("../../metadata.json");
        serde_json::from_str(metadata_str).expect("Failed to parse metadata.json")
    }
}
