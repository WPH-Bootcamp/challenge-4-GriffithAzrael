const prompt = require("prompt-sync")({ sigint: true });

let todos = [];

function generateUniqueId() {
  // TODO: Implementasi fungsi untuk menghasilkan ID unik
  // Ini akan digunakan secara internal untuk setiap objek to-do
  // Contoh: Gabungan waktu saat ini dan angka acak
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function addTodo() {
  // TODO: Implementasi logika untuk menambah to-do baru
  // 1. Minta input teks to-do dari user menggunakan `prompt()`
  // 2. Validasi input: Pastikan teks tidak kosong atau hanya spasi
  // 3. Buat objek to-do baru dengan properti: id (dari generateUniqueId), text, dan isCompleted (boolean, default false)
  // 4. Tambahkan objek to-do ini ke array `todos`
  // 5. Beri feedback ke user bahwa to-do berhasil ditambahkan
  let text = prompt("Enter your to-do: ");
  if (text.trim() === "" || text === null) {
    console.log("To-do text cannot be empty or only spaces.");
    return;
  }
  text = text.trim();

  let newTodo = {
    id: generateUniqueId(),
    text,
    isCompleted: false,
  };
  todos.push(newTodo);
  console.log(`To-do "${text}" has been added successfully.`);
  console.log(todos);
}

function markTodoCompleted() {
  // TODO: Implementasi logika untuk menandai to-do sebagai selesai
  // 1. Panggil `listTodos()` untuk menampilkan daftar to-do
  // 2. Minta user memasukkan NOMOR to-do yang ingin ditandai sebagai selesai
  // 3. Validasi input: Pastikan nomor adalah angka, dalam rentang yang valid (1 sampai jumlah to-do)
  // 4. Ubah properti `isCompleted` dari to-do yang dipilih menjadi `true`
  // 5. Beri feedback ke user bahwa to-do berhasil ditandai selesai
  // 6. Tangani kasus jika to-do sudah selesai
  function askIntInRange(message, min, max) {
    const raw = prompt(message);
    if (!raw) return null;
    const n = Number.parseInt(raw.trim(), 10);
    if (Number.isNaN(n) || n < min || n > max) return null;
    return n;
  }

  if (todos.length === 0) {
    console.log("No to-dos yet.");
    return;
  }

  listTodos();
  const num = askIntInRange(
    "Enter the number of the to-do you want to mark as completed: ",
    1,
    todos.length
  );
  if (num === null) {
    console.log("Invalid number. Please enter a valid number from the list.");
    return;
  }

  const idx = num - 1;
  const todo = todos[idx];

  if (todo.isCompleted) {
    console.log(`To-do "${todo.text}" is already completed.`);
    return;
  }

  todo.isCompleted = true;
  console.log(`To-do "${todo.text}" has been completed.`);
}

function deleteTodo() {
  // TODO: Implementasi logika untuk menghapus to-do
  // 1. Panggil `listTodos()` untuk menampilkan daftar to-do
  // 2. Minta user memasukkan NOMOR to-do yang ingin dihapus
  // 3. Validasi input: Pastikan nomor adalah angka, dalam rentang yang valid
  // 4. Hapus to-do yang dipilih dari array `todos`
  // 5. Beri feedback ke user bahwa to-do berhasil dihapus
  function askIntInRange(message, min, max) {
    const raw = prompt(message);
    if (!raw) return null;
    const n = Number.parseInt(raw.trim(), 10);
    if (Number.isNaN(n) || n < min || n > max) return null;
    return n;
  }

  if (todos.length === 0) {
    console.log("No to-dos to delete.");
    return;
  }

  listTodos();
  const num = askIntInRange(
    "Enter the number of the to-do you want to delete: ",
    1,
    todos.length
  );
  if (num === null) {
    console.log("Invalid number. Please enter a valid number from the list.");
    return;
  }

  const idx = num - 1;
  const [removed] = todos.splice(idx, 1);
  console.log(`To-do "${removed.text}" has been deleted.`);
}

function listTodos() {
  // TODO: Implementasi logika untuk menampilkan semua to-do
  // 1. Tampilkan judul daftar (misal: "--- YOUR TO-DO LIST ---")
  // 2. Cek apakah array `todos` kosong. Jika ya, tampilkan pesan "No to-dos to display."
  // 3. Jika tidak kosong, iterasi (loop) melalui array `todos`
  // 4. Untuk setiap to-do, tampilkan nomor urut, status ([DONE] atau [ACTIVE]), dan teks to-do
  //    Contoh format: "1. [ACTIVE] | Belajar JavaScript"
  // 5. Tampilkan garis penutup daftar
  if (todos.length === 0) {
    console.log("No to-dos to display.");
    return;
  }

  todos.forEach((todo, idx) => {
    const status = todo.isCompleted ? "[DONE]" : "[ACTIVE]";
    console.log(`${idx + 1}. ${status} | ${todo.text}`);
  });
}

function runTodoApp() {
  // TODO: Implementasi logika utama aplikasi (menu interaktif)
  // Ini adalah "otak" aplikasi yang terus berjalan sampai user memilih untuk keluar
  let running = true;
  while (running) {
    // 1. Tampilkan menu perintah yang tersedia (add, complete, delete, list, exit)
    // 2. Minta user memasukkan perintah menggunakan `prompt()`
    // 3. Gunakan `switch` statement atau `if/else if` untuk memanggil fungsi yang sesuai
    //    berdasarkan perintah yang dimasukkan user
    // 4. Tangani perintah 'exit' untuk menghentikan loop aplikasi
    // 5. Tangani input perintah yang tidak valid
    console.log("Here are your to-do's: ", todos);
    console.log("\n--- TO-DO LIST MENU ---");
    console.log("1. Add a to-do (type '1')");
    console.log("2. Mark a to-do as completed (type '2')");
    console.log("3. Delete a to-do (type '3')");
    console.log("4. Show the to-do list (type '4')");
    console.log("5. Exit (type '5')");

    const command = prompt("Enter your command: ").trim().toLowerCase();

    if (command === "1" || command === "add") {
      addTodo();
    } else if (command === "2" || command === "complete") {
      markTodoCompleted();
    } else if (command === "3" || command === "delete") {
      deleteTodo();
    } else if (command === "4" || command === "list") {
      listTodos();
    } else if (command === "5" || command === "exit" || command === "q") {
      running = false;
      console.log("Bye!");
    } else {
      console.log(
        "Unknown command. Please choose 1-5 (or add/complete/delete/list/exit)."
      );
    }
  }
}

// Jangan ubah bagian di bawah ini. Ini adalah cara Node.js menjalankan fungsi utama
// dan mengekspor fungsi-fungsi untuk pengujian (jika nanti ada).

if (require.main === module) {
  runTodoApp();
}

module.exports = {
  todos,
  generateUniqueId,
  addTodo,
  markTodoCompleted,
  deleteTodo,
  listTodos,
  runTodoApp,
};
