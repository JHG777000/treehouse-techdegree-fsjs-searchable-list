/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
   
// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing


/*** 
   Add your global variables that store the DOM elements you will 
   need to reference and/or manipulate. 
   
   But be mindful of which variables should be global and which 
   should be locally scoped to one of the two main functions you're 
   going to create. A good general rule of thumb is if the variable 
   will only be used inside of a function, then it can be locally 
   scoped to that function.
***/

const students = document.getElementsByClassName('student-item cf');
const max_items_per_page = 10;

/*** 
   Create the `showPage` function to hide all of the items in the 
   list except for the ten you want to show.

   Pro Tips: 
     - Keep in mind that with a list of 54 students, the last page 
       will only display four.
     - Remember that the first student has an index of 0.
     - Remember that a function `parameter` goes in the parens when 
       you initially define the function, and it acts as a variable 
       or a placeholder to represent the actual function `argument` 
       that will be passed into the parens later when you call or 
       "invoke" the function 
***/

function showPage(list,page) {

   let start_index = (page*max_items_per_page)-max_items_per_page;
   let end_index = page*max_items_per_page;

   for (let i = 0; i < students.length;i++) {
      students[i].hidden = (i < end_index && i >= start_index ) ? false : true;
   }

}

showPage(students,1);
appendPageLinks(students);


/*** 
   Create the `appendPageLinks function` to generate, append, and add 
   functionality to the pagination buttons.
***/

function appendPageLinks(list) {

   let page_div = document.getElementsByClassName('page')[0];
   let mydiv = document.createElement('div');
   mydiv.className = 'pagination';
   page_div.appendChild(mydiv);
   let mylist = document.createElement('ul');
   mydiv.appendChild(mylist);
   let number_of_pages = list.length / 10 ;

   function page_link_clicked(e) {
      let page_list = mylist.getElementsByTagName('a');
      let page_id = 0;
      for (let i = 0; i < page_list.length;i++) {

         if (page_list[i] === e.target) {

            page_list[i].className = 'active';
            page_id = i+1;

         } else {
            page_list[i].className = '';
         }
        
      }
      showPage(students,page_id);
   }

   function add_a_element(li,page) {
      let element = document.createElement('a');
      element.href = '#';
      element.textContent = page;
      if (page == 1) element.className = 'active';
      element.addEventListener("click", page_link_clicked);
      li.appendChild(element);
   }

   for (let i = 0; i < number_of_pages;i++) {
      let element = document.createElement('li');
      add_a_element(element,i+1);
      mylist.appendChild(element);
   }
}

//.addEventListener("click", printQuote, false);

// Remember to delete the comments that came with this file, and replace them with your own code comments.