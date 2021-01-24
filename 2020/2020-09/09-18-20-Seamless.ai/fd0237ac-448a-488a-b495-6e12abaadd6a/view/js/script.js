// Js code

const name = document.getElementById("name");
const mobile = document.getElementById("mobile");
const email = document.getElementById("email");
const submitButton = document.getElementById("submit");
const errorNotice = document.getElementById("error");

const table = document.getElementById("summaryTable");
const tableNameHeader = document.getElementById("nameColumn")
const tableBody = table.getElementsByTagName("tbody")[0]

const search = document.getElementById("search");
const noResultsNotice = document.getElementById("noResult")

window.sortOrder = 'none';
window.filter = '';

const clearTable = () => tableBody.innerHTML = ''

const createColInsertForRow = (row) => (text) => {
    const col1 = row.insertCell()
    const contactName  = document.createTextNode(text);
    col1.appendChild(contactName)
}

const asc = (a, b) => {
    if (a.name < b.name)
        return -1;
    if ( a.name > b.name)
        return 1;
    return 0;
}
const desc = (a, b) => {
    if (a.name < b.name)
        return 1;
    if ( a.name > b.name)
        return -1;
    return 0;
}

const setVisible = (element, isVisible) => {
    const classToAdd = isVisible ? 'db' : 'dn';
    const classToRemove = isVisible ? 'dn' : 'db';

    element.classList.contains(classToRemove) && element.classList.remove(classToRemove);
    element.classList.add(classToAdd)
}

const renderTable = () => {
    clearTable();

    const filteredContactList= window.contactsList.filter(contact => window.filter !== '' ? (contact.mobile +'').includes(window.filter) : true)

    setVisible(noResultsNotice, filteredContactList.length === 0)

    const sortedContactList = window.sortOrder === 'none' ?
        filteredContactList : filteredContactList.sort(window.sortOrder === 'asc' ? asc : desc)

    sortedContactList.forEach(contact => {
        const insertCol = createColInsertForRow(tableBody.insertRow());
        insertCol(contact.name);
        insertCol(contact.mobile);
        insertCol(contact.email);
    });
}

submitButton.addEventListener('click', () => {
    const isNameValid = name.value && !!name.value.match(/^[a-zA-Z, ]*$/);
    const isMobileValid = mobile.value && !!mobile.value.match(/^[0-9]*$/) && mobile.value.length === 10;
    // Regex courtesy of: https://regexlib.com/Search.aspx?k=email&AspxAutoDetectCookieSupport=1
    const isEmailValid = email.value && !!email.value.match(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/) && email.value.length < 40;

    const isFormValid = isEmailValid && isMobileValid && isNameValid

    if(isFormValid){
        window.contactsList.push({name: name.value, mobile: mobile.value, email: email.value})
        name.value = ''
        mobile.value = ''
        email.value = ''
    }
    setVisible(errorNotice, !isFormValid)
    renderTable()
})

tableNameHeader.addEventListener('click' ,() => {
     window.sortOrder = window.sortOrder === 'none' ?
        'asc': window.sortOrder === 'asc' ? 'desc' : 'asc'
    renderTable()
})

search.addEventListener('input', (e) => {
    window.filter = e.target.value;
    renderTable()
})
