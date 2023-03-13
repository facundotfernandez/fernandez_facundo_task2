import { data } from "./data.js";

function init_CategoriesAndEvents() {

    let EventsGroup = []
    let CategoriesGroup = []
    let CategoriesHTMLSection = ""

    data.events.forEach(event => {

        if (event.date >= data.currentDate) {

            if (!CategoriesGroup.includes(event.category)) {

                CategoriesGroup.push(event.category)

                CategoriesHTMLSection += `
                    <input type="checkbox" class="btn-check" id="btncheck-${event._id}" value="${event.category}">
                    <label class="btn categories-category" for="btncheck-${event._id}">${event.category}</label>
                `;

            };

            EventsGroup.push(event)

        };

    });

    document.getElementById("NavMainCategories").innerHTML = CategoriesHTMLSection

    const CheckboxGroup = [...document.querySelectorAll("input[class = btn-check")]
    const SearchInput = document.getElementById("SearchInput")

    CheckboxGroup.forEach(checkbox => {
        checkbox.addEventListener("click", updateEventsShown)
    })

    SearchInput.addEventListener("keyup", updateEventsShown)

    return EventsGroup

};

function updateEventsShown() {

    let EventsHTMLSection = "";
    let CheckboxGroupChecked = [...document.querySelectorAll("input[class = btn-check]:checked")].map(category => category.value);
    let SearchInputValue = document.getElementById("SearchInput").value.toLowerCase();

    EventsAvailable.forEach(event => {

        if ((CheckboxGroupChecked.length == 0 || CheckboxGroupChecked.includes(event.category)) && (SearchInputValue.length == 0 || (event.name.toLowerCase()).includes(SearchInputValue) || (event.description.toLowerCase()).includes(SearchInputValue))) {

            EventsHTMLSection += `
                <div class="col">
                    <div class="card h-100 w-100">
                        <img src="${event.image}" class="card-img p-2 rounded-5" alt="${event.name} Event Image">
                        <div class="card-body d-flex flex-column justify-content-between">
                            <p class="card-title fs-4">${event.name}</p>
                            <p class="card-text">${event.description}</p>
                            <div class="card-footer d-flex justify-content-between">
                                <p class="card-text my-0 py-1 px-2"">$ ${event.price}</p>
                                <a class="card-text see-more py-1 px-2 rounded-3" href="./details.html?id=${event._id}">See more</a>
                            </div>
                        </div>
                    </div>
                </div>
            `;

        };

    });

    if (EventsHTMLSection == "") {
        alert("Adjust the filters to find an event")
    }

    document.getElementById("CardMainGroup").innerHTML = EventsHTMLSection

};

const EventsAvailable = init_CategoriesAndEvents()

updateEventsShown()