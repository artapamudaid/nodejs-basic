const fs = require('fs');
const { parse } = require('path');
const path = './todos.json';

// Ambil input dari terminal
// process.argv[0] = path mode, [1] = path file, [2] = perintah, [3] = isi tugas
const command = process.argv[2];
const task = process.argv[3];

// Fungsi untuk membaca data dari file JSON
const loadTodos = () => {
    if (!fs.existsSync(path)) return [];
    try {
        const dataBuffer = fs.readFileSync(path);
        return JSON.parse(dataBuffer.toString());
    } catch (e) {
        return []; // Mengembalikan array kosong jika file korup/kosong
    }
};

// Fungsi untuk menyimpan data ke file JSON
const saveTodos = (todos) => {
    fs.writeFileSync(path, JSON.stringify(todos, null, 2));
};

// Logika perintah
if (command === 'add') {
    const todos = loadTodos();
    todos.push({id: Date.now(), task: task, status: 'pending'});
    saveTodos(todos);
    console.log('✅ Tugas berhasil ditambahkan!');
} else if (command === 'list'){
    const todos = loadTodos();
    if(todos.length == 0) {
        console.log('📭 Daftar tugas masih kosong.');
    } else {
        console.log('--- DAFTAR TUGAS ANDA ---');
        todos.forEach((t, i) => {
            console.log(`${i + 1}. [${t.status}] ${t.task}`)
        });
    }
} else if (command === 'delete') {
    const todos = loadTodos();
    //gunakan task sebagai nomor urut (index + 1)
    const indexToDelete = parseInt(task) - 1;

    if(indexToDelete >= 0 && indexToDelete < todos.length){
        //Filter : simpan semua kecuali indexToDelete
        const newTodos = todos.filter((_,index) => index !== indexToDelete);
        saveTodos(newTodos);
        console.log(`🗑️ Tugas nomor ${task} berhasil dihapus!`);
    } else {
        console.log('❌ Nomor tugas tidak ditemukan. Cek "list" terlebih dahulu.');
    }
} else if (command === 'done') {
    const todos = loadTodos();
    const indexToUpdate = parseInt(task) - 1;

    if(indexToUpdate >= 0 && indexToUpdate < todos.length){
        //ubah status pada indexToUpdate
        todos[indexToUpdate].status = 'done';

        saveTodos(todos);
        console.log(`✅ Tugas nomor ${task} ditandai selesai!`);
    } else {
        console.log('❌ Nomor tugas tidak valid.');
    }
} else if (command === 'clear') {
    //Hapus Bersih/Kosongkan todo list
    saveTodos([]);
    console.log('🧹 Semua tugas telah dibersihkan!');
} else {
    // Pesan bantuan
    console.log('Gunakan perintah:');
    console.log('  node index.js add "nama tugas"');
    console.log('  node index.js list');
    console.log('  node index.js delete [nomor]');
    console.log('  node index.js done [nomor]');
    console.log('  node index.js clear');
}