function sendToOpenSecrets(info, tab) {
  const highlightedText = info.selectionText;
  const url = 'https://www.opensecrets.org/orgs/all-profiles';
  const codeToInject = `
    const searchText = '${highlightedText}';
    const searchInput = document.querySelector('#orgs-search-input');
    if (searchInput) {
      searchInput.value = searchText;
      searchInput.dispatchEvent(new Event('input', { 'bubbles': true }));
      const searchForm = searchInput.closest('form');
      if (searchForm) {
        searchForm.submit();
      }
    }
  `;

  chrome.tabs.create({ url }, (newTab) => {
    chrome.tabs.executeScript(newTab.id, { code: codeToInject });
  });
}

chrome.contextMenus.create({
  title: "Send to OpenSecrets",
  contexts: ["selection"],
  onclick: sendToOpenSecrets
});
