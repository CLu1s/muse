#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]
use std::sync::Arc;
use std::thread;

fn main() {
  tauri::Builder::default()
  .invoke_handler(tauri::generate_handler![set_wallpaper , open_url])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}


#[tauri::command]
fn set_wallpaper(url: &str) {
  let v = Arc::new(url.to_string()); // Envolver en un Arc<String>
  let v_clone = Arc::clone(&v); // Clonar para pasar una copia al hilo
  thread::spawn(move || {
    wallpaper::set_from_url(&v_clone).unwrap(); // Pasar una referencia al String
});
  
}

#[tauri::command]
fn open_url(url: &str) -> String {
  webbrowser::open(url).unwrap();
  format!("Opening {}", url)
}