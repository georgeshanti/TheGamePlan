items = require('./new_list.json');
fs = require('fs');


function shuffle(arra1) {
    var ctr = arra1.length, temp, index;

// While there are elements in the array
    while (ctr > 0) {
// Pick a random index
        index = Math.floor(Math.random() * ctr);
// Decrease ctr by 1
        ctr--;
// And swap the last element with it
        temp = arra1[ctr];
        arra1[ctr] = arra1[index];
        arra1[index] = temp;
    }
    return arra1;
}
new_array = shuffle(items)

new_array = new_array.map((x)=>{
    if(x.basePrice>40 && x.basePrice<80)
        x.basePrice -= 10
    return x
})

str = JSON.stringify(new_array);

fs.writeFile("./new_list_1.json", str, function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
}); 

console.log(new_array)
