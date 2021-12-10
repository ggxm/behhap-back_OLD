document.addEventListener("DOMContentLoaded", function() {

  /**
   * TOOLS
   */

  // Tool form : toggle tags by category

  if (document.querySelector('[data-tool-form]').length > 0) {
    
    const toolFormCategoryCheckbox = document.querySelectorAll('[tool-form-category-checkbox]');

    toolFormCategoryCheckbox.forEach(el => {

      // Init
      let idCategory = el.getAttribute('value');
      let toolFormCategoryTags = document.querySelector('[tool-form-category-tags-'+idCategory+']');

      if (el.checked) {
        toolFormCategoryTags.classList.add('active');
      } else {
        let toolFormCategoryTagsCheckbox = document.querySelectorAll('[tool-form-category-tags-'+idCategory+'] [type=checkbox]');
        toolFormCategoryTagsCheckbox.forEach(checkbox => {
          checkbox.checked = false;
        });
        toolFormCategoryTags.classList.remove('active');
      }

      // Process
      el.addEventListener('change', () => {

        if (el.checked) {
          toolFormCategoryTags.classList.add('active');
        } else {
          let toolFormCategoryTagsCheckbox = document.querySelectorAll('[tool-form-category-tags-'+idCategory+'] [type=checkbox]');
          toolFormCategoryTagsCheckbox.forEach(checkbox => {
            checkbox.checked = false;
          });
          toolFormCategoryTags.classList.remove('active');
        }

      });
    });


  }

});
