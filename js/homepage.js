// {
// "id": 1,
// "title": "Fix navigation menu on mobile devices",
// "description": "The navigation menu doesn't collapse properly on mobile devices. Need to fix the responsive behavior.",
// "status": "open",
// "labels": [
// "bug",
// "help wanted"
// ],
// "priority": "high",
// "author": "john_doe",
// "assignee": "jane_smith",
// "createdAt": "2024-01-15T10:30:00Z",
// "updatedAt": "2024-01-15T10:30:00Z"
// },

const createElement = (arr) => {
    const htmlElements = arr.map((el) => `<div class="badge badge-md bg-red-400">${el}</div>`)
    return htmlElements.join(" ")
}
const cardContainer = document.getElementById('cardContainer')
async function loadCard() {
    cardContainer.innerHTML = "";
    const res = await fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues');
    // console.log(res);
    const data = await res.json()
    // console.log(data);
    data.data.forEach(data => {
        // console.log(data);
        const div = document.createElement('div');
        div.className=`shadow-sm bg-white rounded-xl h-full flex flex-col justify-between border-t-4 ${data.status === "open" ? "border-t-[#00A96E]" : "border-t-purple-500"}`
        div.innerHTML = ` 
        <div>
                       <div class="p-4 space-y-3">
                            <div class="flex justify-between items-center">
                                <img src="./assets/Open-Status.png" alt="">
                                <div class="badge badge-md text-[#EF4444] bg-[#FEECEC] px-6 rounded-full">${data.priority}</div>
                            </div>
                            <div class="space-y-2">
                                <h1 class="text-[#64748B] text-[14px] font-semibold line-clamp-1">${data.title}</h1>
                                <p class="text-[#64748B] text-[12px] line-clamp-2">${data.description}</p>
                                <div class="">
                                    ${createElement(data.labels)}
                                </div>
                            </div>
                        </div>
                        <hr class="border text-base-300">
                        <div class="p-4 space-y-1">
                             <p class="text-[#64748B] text-[12px]">#1 by ${data.author}-${data.createdAt}</p>
                            <p class="text-[#64748B] text-[12px]">${data.assignee}-${data.updatedAt}</p>
                        </div>
         </div>

        `;
        cardContainer.appendChild(div)

    });

}
loadCard();






// const cardContainer = document.getElementById("cardContainer");

// let allIssues = [];

// // 🔹 Load all issues
// async function loadIssues() {
//     const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
//     const data = await res.json();

//     allIssues = data.data;
//     displayIssues(allIssues);
// }

// // 🔹 Display cards
// function displayIssues(issues) {
//     cardContainer.innerHTML = "";

//     issues.forEach((data, index) => {
//         const div = document.createElement("div");

//         div.className = `
//       shadow-sm bg-white border-t-4 
//       ${data.status === "open" ? "border-t-[#00A96E]" : "border-t-purple-500"} 
//       rounded-xl
//     `;

//         div.innerHTML = `
//       <div class="p-4 space-y-3">
        
//         <!-- top -->
//         <div class="flex justify-between items-center">
//           <p class="text-xs font-medium ${data.status === "open" ? "text-green-600" : "text-purple-600"}">
//             ${data.status}
//           </p>
//           <div class="badge badge-md px-6 rounded-full">
//             ${data.priority}
//           </div>
//         </div>

//         <!-- content -->
//         <div class="space-y-2">
//           <h1 class="text-[#64748B] text-[14px] font-semibold">
//             ${data.title}
//           </h1>

//           <p class="text-[#64748B] text-[12px]" style="
//             display:-webkit-box;
//             -webkit-line-clamp:2;
//             -webkit-box-orient:vertical;
//             overflow:hidden;
//           ">
//             ${data.description}
//           </p>

//           <!-- labels -->
//           <div class="flex flex-wrap gap-2">
//             ${data.labels.map(label => `
//               <div class="badge badge-sm">${label}</div>
//             `).join("")}
//           </div>
//         </div>

//       </div>

//       <hr class="border text-base-300">

//       <!-- bottom -->
//       <div class="p-4">
//         <p class="text-[#64748B] text-[12px]">
//           <span>#${index + 1} by ${data.author}</span>
//           <span class="ml-2">${data.createdAt}</span>
//         </p>
//       </div>
//     `;

//         cardContainer.appendChild(div);
//     });
// }

// // 🔹 Filter
// function filterStatus(status) {
//     const filtered = allIssues.filter(item => item.status === status);
//     displayIssues(filtered);
// }

// // 🔹 Button click events (manual attach)
// document.querySelectorAll(".btn").forEach(btn => {
//     btn.addEventListener("click", () => {
//         const text = btn.innerText.toLowerCase();

//         if (text === "all") loadIssues();
//         else if (text === "open") filterStatus("open");
//         else if (text === "closed") filterStatus("closed");
//     });
// });

// // প্রথম load
// loadIssues();
