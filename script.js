function toBinary(n) {
    return n
        .toString(2)
        .padStart(8, '0');
}

function calculateBCC() {
    const text = document
        .getElementById("inputText")
        .value;
    if (!text) 
        return;
    
    let tableHTML = `
    <table class="w-full table-auto border-collapse border mt-4">
    <thead>
        <tr class="bg-gray-200">
        <th class="border px-4 py-2">Char</th>
        <th class="border px-4 py-2">ASCII</th>
        <th class="border px-4 py-2">Binary</th>
        </tr>
    </thead>
    <tbody>`;

    let bcc = 0;

    for (let i = 0; i < text.length; i++) {
        const ascii = text.charCodeAt(i);
        const binary = toBinary(ascii);
        tableHTML += `
    <tr class="text-center">
        <td class="border px-4 py-2">${text[i]}</td>
        <td class="border px-4 py-2">${ascii}</td>
        <td class="border px-4 py-2">${binary}</td>
    </tr>`;
        bcc ^= ascii;
    }
    tableHTML += `</tbody></table>`;

    const bccChar = String.fromCharCode(bcc);
    const bccBinary = toBinary(bcc);

    const resultHTML = `
    <div class="mt-6 text-center text-lg">
        <p><strong>BCC Character:</strong> '${bccChar}'</p>
        <p><strong>Decimal:</strong> ${bcc}</p>
        <p><strong>Binary:</strong> ${bccBinary}</p>
    </div>
`;

    document
        .getElementById("output")
        .innerHTML = tableHTML + resultHTML;
}

function checkChar() {
    const char = document
        .getElementById("singleChar")
        .value;
    if (!char || char.length !== 1) {
        document
            .getElementById("charOutput")
            .innerHTML = '<p class="text-red-500">Masukkan tepat 1 karakter.</p>';
        return;
    }

    const ascii = char.charCodeAt(0);
    const binary = toBinary(ascii);

    const result = `
    <div class="text-center text-md">
    <p><strong>Karakter:</strong> '${char}'</p>
    <p><strong>ASCII Decimal:</strong> ${ascii}</p>
    <p><strong>Binary (8-bit):</strong> ${binary}</p>
    </div>
`;

    document
        .getElementById("charOutput")
        .innerHTML = result;
}

function toggleAsciiTable() {
    const modal = document.getElementById("asciiModal");
    modal
        .classList
        .toggle("hidden");
    modal
        .classList
        .toggle("flex");

    const tbody = document.getElementById("asciiTableBody");
    if (tbody.innerHTML !== "") 
        return; // Isi hanya sekali
    
    for (let i = 32; i <= 126; i++) {
        const char = String.fromCharCode(i);
        const binary = toBinary(i);
        tbody.innerHTML += `
    <tr class="text-center">
        <td class="border px-4 py-1">${char}</td>
        <td class="border px-4 py-1">${i}</td>
        <td class="border px-4 py-1">${binary}</td>
    </tr>
    `;
    }
}

function validateDataBCC() {
    const data = document
        .getElementById("validateData")
        .value;
    const bccChar = document
        .getElementById("validateBCC")
        .value;

    if (!data) {
        document
            .getElementById("validationResult")
            .innerHTML = '<span class="text-red-500">Data tidak boleh kosong.</span>';
        return;
    }
    if (!bccChar || bccChar.length !== 1) {
        document
            .getElementById("validationResult")
            .innerHTML = '<span class="text-red-500">Masukkan karakter BCC dengan benar.</span>';
        return;
    }

    let xorResult = 0;
    for (let i = 0; i < data.length; i++) {
        xorResult ^= data.charCodeAt(i);
    }
    xorResult ^= bccChar.charCodeAt(0);

    if (xorResult === 0) {
        document
            .getElementById("validationResult")
            .innerHTML = '<span class="text-green-600">✅ Data valid, tidak terdeteksi error.</span>';
    } else {
        document
            .getElementById("validationResult")
            .innerHTML = '<span class="text-red-600">❌ Error terdeteksi pada data!</span>';
    }
}
