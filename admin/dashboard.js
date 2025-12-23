// helper used by admin/dashboard.html to populate counts & recent items
window.populateDashboard = function(data){
  try{
    if(data == null) return;
    const elServices = document.getElementById('total-services');
    const elProjects = document.getElementById('total-projects');
    const elRequests = document.getElementById('total-requests');
    if(elServices) elServices.textContent = data.services ?? 0;
    if(elProjects) elProjects.textContent = data.projects ?? 0;
    if(elRequests) elRequests.textContent = data.requests ?? 0;

    const list = document.getElementById('recent-requests-list');
    if(list && Array.isArray(data.recent)){
      list.innerHTML = '';
      data.recent.slice(0,3).forEach(r=>{
        const li = document.createElement('li');
        li.className = 'request-item';
        li.innerHTML = `<div>
            <div class="req-title">${r.title}</div>
            <div class="req-meta">${r.client} • ${r.email}</div>
          </div>
          <div class="req-time">${r.time}</div>`;
        list.appendChild(li);
      });
    }
  }catch(err){console.error('populateDashboard error', err)}
};
