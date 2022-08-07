let dataBase;
const request = indexedDB.open("budget_tracker", 1);

request.onupgradeneeded = function (event) {
  const dataBase = event.target.result;
  dataBase.createObjectStore("new_charge", { autoIncrement: true });
};

request.onsuccess = function (event) {
  dataBase = event.target.result;
  if (navigator.onLine) {
    uploadInfo();
  }
};

function saveInfo(record) {
  const transaction = dataBase.transaction(["new_record"], "readwrite");
  const recordObjectStore = transaction.objectStore("new_record");
  recordObjectStore.add(record);
}

function uploadInfo() {
  const transaction = dataBase.transaction(["new_record"], "readwrite");
  const recordObjectStore = transaction.objectStore("new_record");
  const getAll = recordObjectStore.getAll();
  getAll.onsuccess = function () {
    if (getAll.result.length > 0) {
      fetch("/api/transaction", {
        method: "POST",
        body: JSON.stringify(getAll.result),
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((serverResponse) => {
          if (serverResponse.message) {
            throw new Error(serverResponse);
          }
          const transaction = db.transaction(["new_record"], "readwrite");
          const recordObjectStore = transaction.objectStore("new_record");
          recordObjectStore.clear();
          alert("All transactions have been logged.");
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };
}

window.addEventListener("online", uploadInfo);
