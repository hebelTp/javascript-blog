{
  'use strict';
  const titleClickHandler = function(event) {
    event.preventDefault();
    const clickedElement = this;
    console.log('Link was clicked!');

    /* remove class 'active' from all article links  */
    const activeLinks = document.querySelectorAll('.titles a.active');

    for (let activeLink of activeLinks) {
      activeLink.classList.remove('active');
    }

    /* add class 'active' to the clicked link */
    console.log('clickedElement:', clickedElement);
    clickedElement.classList.add('active');

    /* remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll('.posts article.active');

    for (let activeArticle of activeArticles) {
      activeArticle.classList.remove('active');
    }

    /* get 'href' attribute from the clicked link */
    const articleSelector = clickedElement.getAttribute('href');
    console.log('articleSelector :', articleSelector );

    /* find the correct article using the selector (value of 'href' attribute) */
    const targetArticle = document.querySelector(articleSelector);
    console.log(targetArticle);

    /* add class 'active' to the correct article */
    targetArticle.classList.add('active');
  };

  /* create function to generate title links */
  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles';
  optArticleTagsSelector = '.post-tags .list';

  function generateTitleLinks() {

    /* remove contents of titleList */
    const titleList = document.querySelector(optTitleListSelector);
    console.log('titleList' , titleList);

    /*for each article */
    const articles = document.querySelectorAll(optArticleSelector);
    let html = '';                                                                      //third method
    console.log('articles' , articles);

    for (let article of articles) {

      /* get the article id */                                                                             // the same //   /* get 'href' attribute from the clicked link */
      const articleId = article.getAttribute('id');                                                                           //const articleSelector = clickedElement.getAttribute('href');
      console.log('article Id' , articleId);                                                                                  //console.log('articleSelector :', articleSelector );

      /* find the title element */
      /* get the title from the title element */
      const articleTitle = article.querySelector(optTitleSelector).innerHTML;
      console.log(articleTitle);

      /* create HTML of the link */
      const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
      console.log('linkHTML' , linkHTML);

      /* insert link into titleList */
      /*titleList.innerHTML = titleList.innerHTML + linkHTML;*/                   // first method
      /*titleList.insertAdjacentHTML('beforebegin' , linkHTML);*/                 // second method
      html = html + linkHTML;                                                     // third method
      console.log('HTML', html);
    }
    titleList.innerHTML = html;                                                 // third method
    const links = document.querySelectorAll('.titles a');
    console.log('LINKS' , links);                                                       // bug investigation

    for(let link of links) {
      console.log(link);
    }
  }
  generateTitleLinks();

  function generateTags(){
    /* find all articles */
    const articles = document.querySelectorAll(optArticleSelector);
    console.log('ARTILES', articles);
    /* START LOOP: for every article: */
    for (let article of articles ){
    /* find tags wrapper */
      const tagList = article.querySelector(optArticleTagsSelector);
      console.log('TagLELIST' , tagList);

      /* make html variable with empty string */
      let html = '';
      /* get tags from data-tags attribute */
      const articleTags = article.getAttribute('data-tags');
      console.log('TAG SELECTOR', articleTags );
      /* split tags into array */
      const articleTagsArray = articleTags.split(' ');
      console.log('ARTICLETAGSARRAY', articleTagsArray);
      /* START LOOP: for each tag */

      /* generate HTML of the link */

      /* add generated code to html variable */

      /* END LOOP: for each tag */

      /* insert HTML of all the links into the tags wrapper */

    /* END LOOP: for every article: */
    }
  }

  generateTags();







}



