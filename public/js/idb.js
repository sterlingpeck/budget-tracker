let dataBase;
const request = indexedDB.open("budget_tracker", 1);

request.onupgradeneeded = function (event) {
  const dataBase = event.target.result;
  dataBase.createObjectStore("new_charge", { autoIncrement: true });
};

request.onsuccess = function (event) {
  dataBase = event.target.result;
  if (navigator.onLine) {
    uploadRecords();
  }
};

function saveInfo(record) {
  const transaction = dataBase.transaction(["new_record"], "readwrite");
  const recordObjectStore = transaction.objectStore("new_record");
  recordObjectStore.add(record);
}
