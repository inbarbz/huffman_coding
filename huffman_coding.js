function get_frequencies(str) {
    let letters = str.split('').sort();
    let counter = 0;
    let frequencies = [];
    let prev_letter = letters[0];
    for (let i = 0; i < letters.length; i++) {
        if (letters[i] == prev_letter) {
            counter++;
        }
        else {
            frequencies.push({
                letters: [prev_letter],
                count: counter
            });
            counter = 1;
            prev_letter = letters[i];
        }

    }
    //report the last letter in the letters array
    frequencies.push({
        letters: [prev_letter],
        count: counter
    });
    return frequencies;

}

