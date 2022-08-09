function start () {
    getStaffInfo(function(staffInfo) {
        let cards = document.querySelector('.cards');
        staffInfo.forEach(staff => {
            cards.appendChild(card(staffName(staff), staffImg(staff), staffEmail(staff)));
        })

    })
}

function card(staffName, staffImg, staffEmail) {
    let card = document.createElement('article');
    card.className = 'card';
    card.appendChild(staffName);
    card.appendChild(staffImg);
    card.appendChild(staffEmail);
    return card;
}

function staffName(staff) {
    let header = document.createElement('header');
    let staffName = document.createElement('h2');
    staffName.innerText = `${staff.first_name} ${staff.last_name}`;
    header.appendChild(staffName);
    return header;
}

function staffImg(staff) {
    let img = new Image();
    img.src = staff.avatar;
    img.alt = `${staff.first_name} ${staff.last_name}`;
    return img;
}

function staffEmail(staff) {
    let div = document.createElement('div');
    div.className = 'content';
    let staffEmail = document.createElement('p');
    staffEmail.innerHTML = `<span class="emphasize">Email: </span>${staff.email}`;
    div.appendChild(staffEmail);
    return div;
}

function getStaffInfo(callback) {
    let xhr = new XMLHttpRequest();

    xhr.onload = function() {
        try {
            let res = JSON.parse(this.responseText);
            callback(res.data);
        } catch (err) {
            console.log("Unable to parse staff info JSON", err);
        }
    }

    xhr.onerror = function () {
        console.error("Unable to get staff info JSON");
    }

    let url = "https://reqres.in/api/users?page=1";
    xhr.open("GET", url);
    xhr.send();
}


window.onload = start;