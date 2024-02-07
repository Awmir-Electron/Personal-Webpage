let toggleIcon = document.querySelector(".nav__toggle-icon")
let menuOpen = document.querySelector(".menu")
let coverShow = document.querySelector(".cover")
let resumeListItems = document.querySelectorAll(".resume-list__item")
let portfolioItem = document.querySelectorAll(".portfolio__item")
let menuItems = document.querySelectorAll(".menu__item")
let sections = document.querySelectorAll("main > section")
let changeThemeBtn = document.querySelector('.change-theme')
let darkThemeIcon = `<svg width="40" height="40" viewBox="0 0 24 24" id="sun"><g fill="#ffe500" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"><g stroke="#ffe500" stroke-width="2" transform="translate(-919 -2066)"><g transform="translate(920 2067)"><circle cx="11" cy="11" r="5"></circle><path d="M11 0v2M11 20v2M3.22 3.22l1.42 1.42M17.36 17.36l1.42 1.42M0 11h2M20 11h2M3.22 18.78l1.42-1.42M17.36 4.64l1.42-1.42"></path></g></g></g></svg>`
let lightThemeIcon = `<svg viewBox="0 0 48 48" id="moon"><g><g><path fill="#ffe500" d="M40.8 28.4C43.5 18 38.1 7 28.2 2.7c-2.6-1.1-5.4-1.7-8-1.8-.9 0-1.4 1-.8 1.7 4.5 4.7 6.8 11 5.8 17.8-.9 3.6-6.2 2.7-8 4.4-1.9 1.8 4.2 5.1 4.2 5.1-3.3 4.7-8.5 8.2-14.1 9.4-.9.2-1.1 1.3-.3 1.8 1.7 1.2 3.6 2.1 5.6 2.8 12 3.9 24.9-3.1 28.2-15.5z"></path><ellipse cx="24" cy="45.6" fill="#45413c" opacity=".15" rx="11.5" ry="1.5"></ellipse><g><path fill="#fff48c" d="M18.1 27.6c2.3-.7 5.7-.8 6.4-3.6.1-.9.2-1.7.2-2.6-1.6 2.4-5.9 1.8-7.6 3.4-.8.8-.1 1.9 1 2.8zM28.2 2.7c-2.6-1.1-5.4-1.7-8-1.8-.9 0-1.4 1-.8 1.7.6.7 1.2 1.3 1.7 2 9.4 1 17.2 8 19.2 17.4.5 2.3.6 4.6.3 6.8 0-.1.1-.3.1-.4C43.5 18 38.1 7 28.2 2.7zM7 41.1c.6.4 1.3.8 2 1.2 3.4-1.1 8.1-5.3 10.4-7.4.7-.6.6-1.7-.2-2.2-3.2 3.3-7.3 5.8-11.8 6.7-.9 0-1.2 1.2-.4 1.7z"></path></g><path fill="none" stroke="#45413c" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="M40.8 28.4C43.5 18 38.1 7 28.2 2.7c-2.6-1.1-5.4-1.7-8-1.8-.9 0-1.4 1-.8 1.7 4.5 4.7 6.8 11 5.8 17.8-.9 3.6-6.2 2.7-8 4.4-1.9 1.8 4.2 5.1 4.2 5.1-3.3 4.7-8.5 8.2-14.1 9.4-.9.2-1.1 1.3-.3 1.8 1.7 1.2 3.6 2.1 5.6 2.8 12 3.9 24.9-3.1 28.2-15.5zM21.4 29.9c1.9 1.1 3.4 1.4 3.8-.4"></path><circle cx="30.3" cy="23.5" r="1.1" fill="#45413c" stroke="#45413c" stroke-miterlimit="10" transform="rotate(-71.893 30.32 23.481)"></circle><circle cx="32.1" cy="33.6" r="1.3" fill="#fffacf" transform="rotate(-71.899 32.132 33.616)"></circle><path fill="none" stroke="#45413c" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="M17.9 33.9s3.4 3.6 8.3 2.3M26.9 33.9s-1 1-.7 2.2c.4 1.5 1.9 1.7 1.9 1.7"></path></g></g></svg>`
function removeClass(className){
    document.querySelector(`.${className}`).classList.remove(className);
}
toggleIcon.addEventListener("click",function (){
    this.classList.toggle("nav__toggle-icon--open")
    menuOpen.classList.toggle("menu--open")
    coverShow.classList.toggle("cover--show")
})
function navigationTabInit(listitems,listItemActiveClass,contentItemShow){
    listitems.forEach(listitems=>{
        listitems.addEventListener('click',function (){
            removeClass(listItemActiveClass)
            removeClass(contentItemShow)
            this.classList.add(listItemActiveClass)
            let contentId = this.getAttribute('data-content-id')
            document.querySelector(contentId).classList.add(contentItemShow)
        })
    })
}
navigationTabInit(resumeListItems, 'resume-list__item--active', 'resume-content--show')
navigationTabInit(portfolioItem, 'portfolio__item--active', 'portfolio-content--show')
menuItems.forEach(item=>{
    item.addEventListener('click',function (e){
        e.preventDefault()
        item.classList.remove('menu__item--active')
        item.classList.add('menu__item--active')

        let dataSection = item.getAttribute('data-section')
        let offset = document.querySelector(`.${dataSection}`).offsetTop

        window.scrollTo({
            top: offset,
            behavior: "smooth"
        })
    })
})
const observer = new IntersectionObserver(observerHandler,{
    threshold: 0.5
});
function observerHandler(allSections) {
    allSections.map(section => {
        let sectionClassName = section.target.className
        let sectionMenuItem = document.querySelector(`.menu__item[data-section=${sectionClassName}]`)
        if (section.isIntersecting){
            sectionMenuItem.classList.add("menu__item--active")
        } else {
            sectionMenuItem.classList.remove("menu__item--active")
        }
    })
}
sections.forEach(section => {
    observer.observe(section)
})
changeThemeBtn.addEventListener('click',function (){
    document.documentElement.classList.toggle('dark-theme')
    if (document.documentElement.classList.contains('dark-theme')){
        window.localStorage.setItem("theme","dark-theme")
        this.innerHTML = darkThemeIcon
    }else {
        window.localStorage.setItem("theme","light-theme")
        this.innerHTML = lightThemeIcon
    }
})
if(window.localStorage.getItem("theme") === "dark-theme"){
    document.documentElement.classList.add("dark-theme")
    changeThemeBtn.innerHTML = darkThemeIcon
}