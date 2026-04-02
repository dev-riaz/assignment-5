
const cardContainer = document.getElementById("cardContainer");
const OpenCardContainer = document.getElementById("Open-card-container");
const closedCardContainer = document.getElementById('closed-card-container');

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
    all : 0,
    open : 0,
    closed : 0
}

async function loadCard() {
    cardContainer.innerHTML = "";
    OpenCardContainer.innerHTML = "";
    closedCardContainer.innerHTML = "";
    const res = await fetch(
        "https://phi-lab-server.vercel.app/api/v1/lab/issues"
    );
    const data = await res.json();
    showCount(data.data.length)

    const openIssues = data.data.filter(item => item.status === 'open');
    const closedIssues = data.data.filter(item => item.status === 'closed');
    
    counts.all = data.data.length;
    counts.open = openIssues.length;
    counts.closed = closedIssues.length;


    const card = (item) => {
        return `
        <div class="shadow-sm bg-white rounded-xl h-full flex flex-col justify-between border-t-4 ${item.status === "open" ? "border-t-[#00A96E]" : "border-t-purple-500"}">

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
    data.data.forEach(item=> {
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
loadCard()
