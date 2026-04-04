const cardContainer = document.getElementById("cardContainer");
const OpenCardContainer = document.getElementById("Open-card-container");
const closedCardContainer = document.getElementById('closed-card-container');
const modalContainer = document.getElementById('my_modal_1');
const spinner = document.getElementById('loadSpinner');

let allData = [];
const createElement = (arr) => {
    const htmlElements = arr.map(
        (el) =>
            `<div class="badge badge-md ${el === "bug"
                ? "bg-[#FEECEC] text-[#EF4444]"
                : el === "help wanted"
                    ? "bg-[#FFF8DB] text-[#F59E0B]"
                    : el === "enhancement"
                        ? "bg-[#DEFCE8] text-green-500"
                        : el === "good first issue"
                            ? "bg-[#FEECEC] text-[#EF4444]"
                            : el === "documentation"
                                ? "bg-teal-400/10 text-teal-500"
                                : ""
            }">${el}</div>`,
    );
    return htmlElements.join(" ");
};

let counts = {
    all: 0,
    open: 0,
    closed: 0
}

const updateCounts = (data) => {
    counts.all = data.length;
    counts.open = data.filter(i => i.status === 'open').length;
    counts.closed = data.filter(i => i.status === 'closed').length;
};

async function loadCard() {
    cardContainer.innerHTML = "";
    OpenCardContainer.innerHTML = "";
    closedCardContainer.innerHTML = "";
    modalContainer.innerHTML = "";

    spinner.classList.remove('hidden')
    const res = await fetch(
        "https://phi-lab-server.vercel.app/api/v1/lab/issues"
    );
    const data = await res.json();
    allData = data.data;

    showCount(data.data.length)

    spinner.classList.add('hidden')
    const openIssues = data.data.filter(item => item.status === 'open');
    const closedIssues = data.data.filter(item => item.status === 'closed');

    updateCounts(data.data)

    const card = (item) => {
        return `
        <div onclick="handleModal(${item.id})"class="shadow-sm bg-white rounded-xl h-full flex flex-col justify-between border-t-4 ${item.status === "open" ? "border-t-[#00A96E]" : "border-t-purple-500"}">

                        <div class="p-4 space-y-3">
                            <div class="flex justify-between items-center">
                                <img src="${item.status === 'open' ? "./assets/Open-Status.png" : item.status === 'closed' ? "./assets/Closed- Status .png" : ""}" alt="">
                                <div class="badge badge-md px-6 rounded-full ${item.priority === 'high' ? 'bg-[#FEECEC] text-[#EF4444]' : item.priority === "medium" ? 'bg-[#FFF6D1] text-[#F59E0B]' : item.priority === "low" ? 'bg-[#EEEFF2] text-[#9CA3AF]' : ""}">${item.priority}</div>
                            </div>
                            <div class="space-y-3">
                                <h1 class="text-[#64748B] text-[14px] font-semibold line-clamp-1">${item.title}</h1>
                                <p class="text-[#64748B] text-[12px] line-clamp-2">${item.description}</p>
                                <div class="">
                                    <div class="rounded-full">${createElement(item.labels)}</div>
                                </div>
                            </div>
                        </div>
                        <hr class="border text-base-300">
                        <div class="p-4 space-y-1">
                            <p class="text-[#64748B] text-[12px]">#1 by${item.author}-${item.createdAt}</p>
                            <p class="text-[#64748B] text-[12px]">${item.assignee}-${item.updatedAt}</p>
                        </div>
        
        </div>  
        ` ;

    }
    data.data.forEach(item => {
        const div = document.createElement("div");
        div.innerHTML = card(item);
        cardContainer.appendChild(div);

    });
    openIssues.forEach(item => {
        const div = document.createElement("div");
        div.innerHTML = card(item);
        OpenCardContainer.appendChild(div);


    });
    closedIssues.forEach(item => {
        const div = document.createElement("div");
        div.innerHTML = card(item);
        closedCardContainer.appendChild(div);

    });

}


const showCount = (data) => {
    document.getElementById("cardCount").innerText = data;
};

const showIssue = document.querySelectorAll('.showBtn').forEach(btn => {
    btn.addEventListener('click', function () {
        const text = btn.innerText.toLowerCase();
        document.querySelectorAll('.showBtn').forEach(allBtn => {
            allBtn.classList.remove('btn-primary')
        })
        if (text === 'all') {
            btn.classList.add('btn-primary')
            cardContainer.classList.remove('hidden')
            closedCardContainer.classList.add('hidden')
            OpenCardContainer.classList.add('hidden')
            showCount(counts.all)
        } else if (text === 'open') {
            btn.classList.add('btn-primary')
            cardContainer.classList.add('hidden')
            closedCardContainer.classList.add('hidden')
            OpenCardContainer.classList.remove('hidden')
            showCount(counts.open)


        } else if (text === 'closed') {
            btn.classList.add('btn-primary')
            OpenCardContainer.classList.add('hidden')
            closedCardContainer.classList.remove('hidden')
            cardContainer.classList.add('hidden')
            showCount(counts.closed)
        }


    })
})


const handleModal = (id) => {
    const singleData = allData.find(item => item.id == id);

    loadModal(singleData);

    my_modal_1.showModal();
};
const loadModal = (el) => {
    if (!el) return;

    modalContainer.innerHTML = `
    <div class="modal-box space-y-3">
                        <h1 class="text-[#1F2937] text-xl font-semibold">${el.title}</h1>
                        <div class="flex items-center gap-6">
                            <div class="badge badge-sm ${el.status === "open" ? "bg-[#00A96E] text-white" : "bg-purple-500"}">${el.status}</div>
                            <ul class="flex items-center gap-6">
                                <li class="list-disc text-[#64748B] font-semibold text-[12px]">Opened by ${el.author}</li>
                                <li class="list-disc text-[#64748B] font-semibold text-[12px]">${el.createdAt}</li>
                            </ul>
                        </div>
                        <div class="">
                            <div>${createElement(el.labels)}</div>
                        </div>
                        <p class="text-[#64748B] text-[14px]">${el.description}</p>
                        <div class="bg-[#F8FAFC] w-full flex gap-30 p-3">
                            <div class="flex flex-col">
                                <span class="text-[#64847B] font-semibold text-[14px]">Assignee:</span>
                                <span class="text-[#64847B] font-medium text-[12px]">${el.assignee}</span>
                            </div>
                            <div class="flex flex-col">
                                <span class="text-[#64847B] font-semibold text-[14px]">Priority:</span>
                                <div class="badge ${el.priority === 'high' ? 'bg-[#FEECEC] text-[#EF4444]' : el.priority === "medium" ? 'bg-[#FFF6D1] text-[#F59E0B]' : el.priority === "low" ? 'bg-[#EEEFF2] text-[#9CA3AF]' : ""}">${el.priority}</div>
                            </div>
                        </div>
                        <div class="modal-action">
                            <form method="dialog">
                                <button class="outline-none btn btn-primary">Close</button>
                            </form>
                        </div>
                    </div>
    `;
};


document.getElementById('search-btn').addEventListener('click', () => {
    const input = document.getElementById('input-search');

    const searchValue = input.value.trim();

    if (!searchValue) {
        loadCard()
        return;
    }
    async function loadSearch() {
        cardContainer.innerHTML = "";
        OpenCardContainer.innerHTML = "";
        closedCardContainer.innerHTML = "";

        const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchValue}`)

        const data = await res.json()

        const issues = data.data || [];

        showCount(issues.length);
        updateCounts(issues)

        issues.forEach(element => {
            const div = document.createElement("div");
            div.innerHTML = `
                <div onclick="handleModal(${element.id})"class="shadow-sm bg-white rounded-xl h-full flex flex-col justify-between border-t-4 ${element.status === "open" ? "border-t-[#00A96E]" : "border-t-purple-500"}">

                                <div class="p-4 space-y-3">
                                    <div class="flex justify-between items-center">
                                        <img src="${element.status === 'open' ? "./assets/Open-Status.png" : element.status === 'closed' ? "./assets/Closed- Status .png" : ""}" alt="">
                                        <div class="badge badge-md px-6 rounded-full ${element.priority === 'high' ? 'bg-[#FEECEC] text-[#EF4444]' : element.priority === "medium" ? 'bg-[#FFF6D1] text-[#F59E0B]' : element.priority === "low" ? 'bg-[#EEEFF2] text-[#9CA3AF]' : ""}">${element.priority}</div>
                                    </div>
                                    <div class="space-y-3">
                                        <h1 class="text-[#64748B] text-[14px] font-semibold line-clamp-1">${element.title}</h1>
                                        <p class="text-[#64748B] text-[12px] line-clamp-2">${element.description}</p>
                                        <div class="">
                                            <div class="rounded-full">${createElement(element.labels)}</div>
                                        </div>
                                    </div>
                                </div>
                                <hr class="border text-base-300">
                                <div class="p-4 space-y-1">
                                    <p class="text-[#64748B] text-[12px]">#1 by${element.author}-${element.createdAt}</p>
                                    <p class="text-[#64748B] text-[12px]">${element.assignee}-${element.updatedAt}</p>
                                </div>

                </div>  
            `;
            cardContainer.appendChild(div);
            if (element.status === "open") {
                OpenCardContainer.appendChild(div.cloneNode(true));
            } else if (element.status === "closed") {
                closedCardContainer.appendChild(div.cloneNode(true));
            }

        });


    }
    loadSearch()

})
loadCard();
