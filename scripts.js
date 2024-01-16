const getUserLogged = () => {
    const emailLogged = getEmailLogged();
    const prevUsers = JSON.parse(localStorage.getItem("users")) || [];
    const user = prevUsers.find((user) => user.email === emailLogged);
    return user;
};

const writeWelcomeMessage = () => {
    const email = getEmailLogged();
    const user = getUserLogged();
    
    if (!!user && user.counter > 1) {
        document.getElementById("root").innerHTML = `
        <div class="container d-flex flex-column align-items-center justify-content-start" style="height: 100vh; padding: 20px;">
            <div class="row mb-2 w-100 justify-content-between">
                <div class="col" style="font-size: 130%">
                    <pre><b><span title="Numero accessi">${user.counter}</span>      <span title="Ultimo accesso">${user.lastAccess}</span></b></pre>
                </div>
                <div class="col text-end">
                    <button id='button-logout' class="btn btn-primary">Logout</button>
                </div>
            </div>
            <div class="text-center mt-auto mb-auto">
                <h1>Bentornat*<br><br>${email}</h1>
            </div>
        </div>
    `;
    } else {
        document.getElementById("root").innerHTML = `
        <div class="container d-flex flex-column align-items-center justify-content-start" style="height: 100vh; padding: 20px;">
            <div class="row mb-2 w-100 ">
                <div class="col text-end">
                    <button id='button-logout' class="btn btn-primary">Logout</button>
                </div>
            </div>
            <div class="text-center mt-auto mb-auto">
                <h1>Benvenut*<br><br>${email}</h1>
            </div>
        </div>
    `;
    }

    document
        .getElementById("button-logout")
        .addEventListener("click", onClickLogout);
};

const validateEmail = () => {
    const mailformat = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,10})$/;
    const inputLogin = document.getElementById("input-login").value;
    const isValidEmail = inputLogin.match(mailformat);

    document.getElementById("button-login").disabled = !isValidEmail;

    return isValidEmail;
}

const writeFormLogin = () => {
    document.getElementById("root").innerHTML = `
    <div class="container d-flex justify-content-center align-items-center" style="height: 100vh;">
            <div style="box-shadow: 0px 0px 30px #dedede; padding: 100px;">
                <form>
                    <div class="form-group">
                        <input id="input-login" class="form-control" placeholder="Email" oninput="validateEmail()" /><br>
                    </div>
                    <div class="d-flex justify-content-center">
                        <button id="button-login" class="btn btn-primary" disabled>Login</button>
                    </div>
                </form>
            </div>
        </div>
    `;
    document
        .getElementById("button-login")
        .addEventListener("click", onClickLogin);
};

const saveEmailLogged = () => {
    const email = document.getElementById("input-login").value;
    localStorage.setItem("email", email);
};

const deleteEmailLogged = () => {
    localStorage.removeItem("email");
};

const onClickLogin = () => {
    saveEmailLogged();
    saveUserToStorage();
    writeWelcomeMessage();
};

const updateUser = () => {
    const prevUsers = JSON.parse(localStorage.getItem("users")) || [];
    const emailLogged = getEmailLogged();
    const user = getUserLogged();
    lastDataLogin = user.actualAccess;
    const newUsers = prevUsers.map((user) => {
        if (user.email === emailLogged) {
            return {
                ...user,
                actualAccess: new Date().toLocaleString(),
                lastAccess: lastDataLogin,
                counter: user.counter + 1,
            };
        } else return { ...user };
    });
    localStorage.setItem("users", JSON.stringify(newUsers));
};

const saveNewUser = () => {
    const prevUsers = JSON.parse(localStorage.getItem("users")) || [];
    const newUsers = [
        ...prevUsers,
        {
            email: getEmailLogged(),
            actualAccess: new Date().toLocaleString(),
            lastAccess: "",
            counter: 1,
        },
    ];
    localStorage.setItem("users", JSON.stringify(newUsers));
};

const saveUserToStorage = () => {
    const user = getUserLogged();
    if (!!user) updateUser();
    else saveNewUser();
};

const onClickLogout = () => {
    writeFormLogin();
    deleteEmailLogged();
};

const getEmailLogged = () => {
    const email = localStorage.getItem("email");
    return email;
};

window.onload = () => {
    const email = getEmailLogged();
    const isLogged = !!email;
    if (isLogged) writeWelcomeMessage();
    else writeFormLogin();
};