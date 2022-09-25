let mode = process.argv[2]; input = process.argv[3]; output = process.argv[4];

const fs = require("fs");

if (mode == "to_code") {
    let string = fs.readFileSync(input, "utf8") + " ";
    let encoded_String = "";
    let counter = [string[0], 1];
    for (i = 1; i < string.length; i++) {
        if (string[i] == counter[0]) {
            if (counter[1] + 1 == 256) {
                encoded_String += "#" + String.fromCharCode(255) + counter[0];
                counter[1] = 1;
            }
            else counter[1]++;
        }
        else {
            if (counter[1] > 3 || counter[0] == '#') {
                encoded_String += "#" + String.fromCharCode(counter[1]) + counter[0];
                counter = [string[i], 1];
            }
            else {
                encoded_String += counter[0].repeat(counter[1]);
                counter = [string[i], 1];
            }
        }
    }
    fs.writeFile(output, encoded_String, function(error) { if(error) throw error; });
    console.log(encoded_String)
}
if (mode == "to_decode") {
    let string = fs.readFileSync(input, "utf8");
    let decoded_String = "";
    for (i = 0; i < string.length; i++) {
        if (string[i] == "#") {
            decoded_String += string[i+2].repeat(string[i+1].charCodeAt(0));
            i += 2;
        }
        else decoded_String += string[i];
    }
    fs.writeFile(output, decoded_String, function(error) { if(error) throw error; });
    console.log(decoded_String);
}
// файлы, которые надо указать в аргументах, необходимо размещать в той же директории
// причём для работы необходимо 2 файла: один на вход строки, а другой на выход
