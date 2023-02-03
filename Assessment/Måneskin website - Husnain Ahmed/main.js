window.onload = () => {

    const menu = document.querySelector("#mobileMenu");
    const menuLinks = document.querySelector(".navbarMenu");
    const listen = document.querySelector(".mainButton");

    menu.addEventListener("click", function() {
        menu.classList.toggle("is-active");
        menuLinks.classList.toggle("active");
        listen.classList.toggle("active");
    });

    document.getElementById("join").addEventListener("click", (e) => {
        let name = document.getElementById("name").value;
        let email = document.getElementById("email").value;
        e.preventDefault();

        let re_name = /[a-zA-Z\-]{6,32}/;
        let re_email = /([a-zA-Z_\.\-\d]+)@([a-zA-Z_\.\-\d]+)\.([a-zA-Z]{2,5})/;
        if ((!re_name.test(name)) || !re_email.test(email)) {
            alert('wrong input.')
            location.reload()
        }

        console.log("HERE", name, email);

        // below is a template that was sent to me by the unit leader Ashley Williams
        const url = "http://mudfoot.doc.stu.mmu.ac.uk/node/api/mailinglist";

        const data = {
            "name": name,
            "email": email
        };

        fetch(url, {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })
            .then((response) => {
                if (response.status === 200) {
                    return response.json();
                } else if (response.status === 400) {
                    throw "Bad data was sent to the server";
                } else {
                    alert(response.status);

                    throw "Something went wrong";
                }
            })

        .then((resJson) => {
            alert(JSON.stringify(resJson));
            let message = resJson.message;
        })

        .catch((error) => {
            alert(error);
        });
    });
};