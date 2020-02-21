/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
   
//The lis of all of the students.
const students = document.getElementsByClassName('student-item cf');
//Max number of items per page.
const max_items_per_page = 10;

showPage(students,1); //Show the first page.
appendPageLinks(students); //Add the page links.
showSearchBar(); //Add the search bar.

/*
   The showPage function, shows a page of 'max_items_per_page' items 
   for a given list.
*/

function showPage(list,page) {


   //Get the start and end index for a given page.
   let start_index = (page*max_items_per_page)-max_items_per_page;
   let end_index = page*max_items_per_page;

   //Use the start and end index to hide all nonactive list elements,
   //and unhide all active ones.
   for (let i = 0; i < list.length;i++) {
      list[i].hidden = (i < end_index && i >= start_index) ? false : true;
   }

}

/*
   The appendPageLinks function, displays page links for a given list,
   allowing page navigation.
*/

function appendPageLinks(list) {

   //Get, and create the DOM elements for the page links.
   let page_div = document.getElementsByClassName('page')[0];

   let div = document.createElement('div');
   div.className = 'pagination';
   page_div.appendChild(div);

   let list_of_elements = document.createElement('ul');
   div.appendChild(list_of_elements);

   let number_of_pages = list.length / 10 ;

   /*
     The page_link_clicked function, responds to a click event on a page link
     and changes the page, as well sets the page link to active and the last
     one to nonactive.
   */

   function page_link_clicked(e) {
      let page_list = list_of_elements.getElementsByTagName('a');
      let page_id = 0;
      for (let i = 0; i < page_list.length;i++) {

         if (page_list[i] === e.target) {

            page_list[i].className = 'active';
            page_id = i+1;

         } else {
            page_list[i].className = '';
         }
        
      }
      showPage(list,page_id);
   }

   /*
     The add_a_element function, adds an 'a' element to a page link.
   */

   function add_a_element(li,page) {
      let element = document.createElement('a');
      element.href = '#';
      element.textContent = page;
      if (page === 1) element.className = 'active';
      element.addEventListener('click', page_link_clicked);
      li.appendChild(element);
   }

   for (let i = 0; i < number_of_pages;i++) {
      let element = document.createElement('li');
      add_a_element(element,i+1);
      list_of_elements.appendChild(element);
   }
}

/*
   The showSearchBar function, displays a search bar,
   allowing the search of the students list.
*/

function showSearchBar() {
   let page_header = document.getElementsByClassName('page-header cf')[0];

   let div = document.createElement('div');
   div.className = 'student-search';
   page_header.appendChild(div);

   let input = document.createElement('input');
   input.placeholder = 'Search for students...';
   input.addEventListener('keyup',search_students);
   div.appendChild(input);

   let button = document.createElement('button');
   button.textContent = 'Search';
   button.addEventListener('click',search_students);
   div.appendChild(button);
   
  /*
     The search_students function, searches the studens' list to find and 
     display matches, organized in pages.
   */

   function search_students() {
     
      let search_list = []; //List of search results.

      for (let i = 0; i < students.length;i++) {
         let student = students[i].getElementsByTagName('h3')[0].innerText;
         if ( (input.value.length > 0) && 
         (student.toLowerCase().includes(input.value.toLowerCase())) ) {

            search_list.push(students[i]); //Match add a student to search_list.
         }
      }

   //Remove page links, so new ones can be added.   
   let pagination = document.getElementsByClassName('pagination')[0];
   if (pagination !== undefined) pagination.parentNode.removeChild(pagination);

   //Remove 'No students found.' message.   
   let page_div = document.getElementsByClassName('page')[0];
   let msg = page_div.getElementsByTagName('h1')[0];
   if (msg !== undefined) msg.parentNode.removeChild(msg);

   //If nothing is in the search bar, reset to the full list of students.
   if (input.value.length === 0) {
      showPage(students,1);
      appendPageLinks(students);
      return;
   }
   //Show page '0', to reset the students list.
   showPage(students,0);
   if (search_list.length > 0) {
      //Dispay pages for search result.
      showPage(search_list,1);
      appendPageLinks(search_list);
   } else {
      let page_div = document.getElementsByClassName('page')[0];
      let msg = document.createElement('h1');
      msg.textContent = 'No students found.';
      page_div.appendChild(msg);
   }

   }
}

 