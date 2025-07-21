// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { TooltipPosition } from 'atlas-tooltip';
import { Meta, Story } from '@storybook/angular';
import { withDesign } from 'storybook-addon-designs';

import { BADGES } from '.storybook/constants';

export default {
  title: 'Adopters/Templates/MMC Footer',
  decorators: [
    withDesign,   
  ],
  parameters: {    
    badges: [BADGES.ALPHA],
    controls: { sort: 'requiredFirst' },    
    previewTabs: { 
        canvas: { hidden: true } 
        },
    // design: {
    //   type: 'figma',
    //   url: 'https://www.figma.com/file/x74LhhNgStoUDZtMqGjGhg/Foundation-0.0.2',
    //   allowFullscreen: true,
    // },
    options: {
      isToolshown: true,
    }
  }, 
  argTypes: {    
  }     
} as Meta;

const TEMPLATE = `
<div style="zoom: 0.75">
    <footer class="site-footer--new">
        <div class="footer-v3__container">
            <div class="container">
                <div class="footer-v3__container--top">
                    <div class="footer-v3__container--top--marsh">
                        <div class="footer-v3__container--top--marsh--logo">
                            <div class="footer-v3__container--top--marsh--logo--image">
                                <a target="_self" href="https://www.marshmclennan.com">
                                    <img src="./atlas-logos/logo-white.svg" alt="Marsh Mclennan Company Logo">
                                </a>

                            </div>
                        </div>
                        <div class="footer-v3__container--top--marsh--desc">
                            <p class="typographyStyles-mobile-heading-small">Marsh McLennan is the leader in risk, strategy and people, helping clients
                                navigate a dynamic environment through four global businesses.</p>
                        </div>
                    </div>
                    <div class="footer-v3__container--top--partners">
                        <ul class="footer-v3__container--top--partners--list">
                            <li class="footer-v3__container--top--partners--list--item">
                                <a target="_self" href="https://www.marsh.com"
                                    class="footer-v3__container--top--partners--list--item--link">
                                    <img src="./atlas-logos/Marsh.svg" alt="Marsh">
                                </a>
                            </li>
                            <li class="footer-v3__container--top--partners--list--item">
                                <a target="_self" href="https://www.guycarp.com"
                                    class="footer-v3__container--top--partners--list--item--link">
                                    <img src="./atlas-logos/GuyCarpenter.svg" alt="GuyCarpenter">
                                </a>
                            </li>
                            <li class="footer-v3__container--top--partners--list--item">
                                <a target="_self" href="https://www.mercer.com"
                                    class="footer-v3__container--top--partners--list--item--link">
                                    <img src="./atlas-logos/Mercer.svg" alt="Mercer">
                                </a>
                            </li>
                            <li class="footer-v3__container--top--partners--list--item">
                                <a target="_self" href="https://www.oliverwyman.com"
                                    class="footer-v3__container--top--partners--list--item--link">
                                    <img src="./atlas-logos/OliverWyman.svg" alt="OliverWyman">
                                </a>
                            </li>

                        </ul>
                    </div>
                </div>
                <div class="footer-v3__container--middle">
                    <div class="footer-v3__container--middle--social">
                        <div class="site-footer--new__social social footer-v3__container--middle--social--list">

                            <ul class="social-share-icons">

                                <li>Share</li>
                                <li class="social-share-icon-1">
                                    <a href="https://www.instagram.com/marshmclennan/" class="social__custom"
                                        rel="nofollow noopener noreferrer" target="_blank"
                                        ><span style="display:none">Instagram</span>
                                        <svg width="33" height="34" viewBox="0 0 33 34" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <g clip-path="url(#clip0)">
                                                <circle cx="16.5" cy="16.7727" r="16.5" fill="#009DE0"></circle>
                                                <g clip-path="url(#clip1)">
                                                    <path
                                                        d="M16.4998 9.04311C19.0174 9.04311 19.3156 9.0527 20.3098 9.09806C21.2291 9.14001 21.7283 9.29361 22.0606 9.4227C22.5006 9.59374 22.8147 9.79809 23.1447 10.128C23.4746 10.4579 23.6789 10.772 23.8499 11.2121C23.9791 11.5444 24.1327 12.0436 24.1746 12.9629C24.22 13.9571 24.2296 14.2553 24.2296 16.7728C24.2296 19.2904 24.22 19.5886 24.1746 20.5828C24.1327 21.502 23.9791 22.0013 23.8499 22.3335C23.6789 22.7736 23.4746 23.0877 23.1447 23.4177C22.8147 23.7476 22.5006 23.9519 22.0606 24.1229C21.7283 24.252 21.2291 24.4056 20.3098 24.4476C19.3157 24.493 19.0175 24.5025 16.4998 24.5025C13.9821 24.5025 13.684 24.493 12.6899 24.4476C11.7706 24.4056 11.2714 24.252 10.9392 24.1229C10.4991 23.9519 10.1849 23.7476 9.85502 23.4177C9.5251 23.0877 9.32075 22.7736 9.14975 22.3335C9.02063 22.0013 8.86703 21.502 8.82507 20.5828C8.77971 19.5886 8.77013 19.2904 8.77013 16.7728C8.77013 14.2553 8.77971 13.9571 8.82507 12.9629C8.86703 12.0436 9.02063 11.5444 9.14975 11.2121C9.32075 10.772 9.5251 10.4579 9.85502 10.128C10.1849 9.79809 10.4991 9.59374 10.9392 9.4227C11.2714 9.29361 11.7706 9.14001 12.6899 9.09806C13.6841 9.0527 13.9823 9.04311 16.4998 9.04311ZM16.4998 7.34424C13.9392 7.34424 13.6181 7.35509 12.6125 7.40098C11.6089 7.44679 10.9235 7.60615 10.3238 7.83924C9.70374 8.0802 9.17793 8.40259 8.65377 8.92675C8.12961 9.45092 7.80721 9.97673 7.56626 10.5967C7.33316 11.1965 7.1738 11.8819 7.12799 12.8855C7.08211 13.8911 7.07129 14.2122 7.07129 16.7728C7.07129 19.3335 7.08211 19.6546 7.12799 20.6602C7.1738 21.6638 7.33316 22.3492 7.56626 22.9489C7.80721 23.5689 8.12961 24.0947 8.65377 24.6189C9.17793 25.1431 9.70374 25.4655 10.3238 25.7064C10.9235 25.9395 11.6089 26.0989 12.6125 26.1447C13.6181 26.1906 13.9392 26.2014 16.4998 26.2014C19.0605 26.2014 19.3816 26.1906 20.3872 26.1447C21.3908 26.0989 22.0762 25.9395 22.6759 25.7064C23.2959 25.4655 23.8218 25.1431 24.3459 24.6189C24.8701 24.0947 25.1925 23.5689 25.4334 22.9489C25.6665 22.3492 25.8259 21.6638 25.8717 20.6602C25.9176 19.6546 25.9284 19.3335 25.9284 16.7728C25.9284 14.2122 25.9176 13.8911 25.8717 12.8855C25.8259 11.8819 25.6665 11.1965 25.4334 10.5967C25.1925 9.97673 24.8701 9.45092 24.3459 8.92675C23.8218 8.40259 23.2959 8.0802 22.6759 7.83924C22.0762 7.60615 21.3908 7.44679 20.3872 7.40098C19.3816 7.35509 19.0605 7.34424 16.4998 7.34424ZM16.4998 11.9311C13.8258 11.9311 11.6581 14.0988 11.6581 16.7728C11.6581 19.4468 13.8258 21.6145 16.4998 21.6145C19.1738 21.6145 21.3416 19.4468 21.3416 16.7728C21.3416 14.0988 19.1738 11.9311 16.4998 11.9311ZM16.4998 19.9157C14.7641 19.9157 13.357 18.5086 13.357 16.7728C13.357 15.0371 14.7641 13.63 16.4998 13.63C18.2356 13.63 19.6427 15.0371 19.6427 16.7728C19.6427 18.5086 18.2356 19.9157 16.4998 19.9157ZM22.6643 11.7398C22.6643 12.3647 22.1577 12.8713 21.5328 12.8713C20.908 12.8713 20.4014 12.3647 20.4014 11.7398C20.4014 11.1149 20.908 10.6084 21.5328 10.6084C22.1577 10.6084 22.6643 11.1149 22.6643 11.7398Z"
                                                        fill="white"></path>
                                                </g>
                                            </g>
                                            <defs>
                                                <clipPath id="clip0">
                                                    <rect width="33" height="33" fill="white"
                                                        transform="translate(0 0.272705)"></rect>
                                                </clipPath>
                                                <clipPath id="clip1">
                                                    <rect width="18.8571" height="18.8571" fill="white"
                                                        transform="translate(7.07129 7.34424)"></rect>
                                                </clipPath>
                                            </defs>
                                        </svg>

                                    </a>
                                </li>
                                <li class="social-share-icon-2">
                                    <a href="https://www.linkedin.com/company/marshmclennan/" class="social__custom"
                                        rel="nofollow noopener noreferrer" target="_blank"
                                        ><span style="display:none">LinkedIn</span>
                                        <svg width="34" height="34" viewBox="0 0 34 34" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" clipRule="evenodd"
                                                d="M17.2266 0.272705C8.11341 0.272705 0.726562 7.65955 0.726562 16.7727C0.726562 25.8848 8.11341 33.2727 17.2266 33.2727C26.3397 33.2727 33.7266 25.8848 33.7266 16.7727C33.7266 7.65955 26.3397 0.272705 17.2266 0.272705V0.272705Z"
                                                fill="#009DE0"></path>
                                            <path fillRule="evenodd" clipRule="evenodd"
                                                d="M25.4765 25.0073H22.0579V19.6572C22.0579 18.3815 22.0352 16.7408 20.2811 16.7408C18.5021 16.7408 18.2309 18.1309 18.2309 19.5664V25.0073H14.8154V14.0059H18.0927V15.5105H18.1402C18.596 14.6453 19.7118 13.7327 21.3752 13.7327C24.8371 13.7327 25.4765 16.0107 25.4765 18.9735V25.0073Z"
                                                fill="white"></path>
                                            <path fillRule="evenodd" clipRule="evenodd"
                                                d="M10.9617 12.5033C9.86338 12.5033 8.97754 11.6144 8.97754 10.5202C8.97754 9.42605 9.86338 8.53711 10.9617 8.53711C12.0548 8.53711 12.9427 9.42605 12.9427 10.5202C12.9427 11.6144 12.0548 12.5033 10.9617 12.5033V12.5033Z"
                                                fill="white"></path>
                                            <path fillRule="evenodd" clipRule="evenodd"
                                                d="M12.6717 25.0072H9.24902V14.0059H12.6717V25.0072Z" fill="white"></path>
                                        </svg>

                                    </a>
                                </li>
                                <li class="social-share-icon-3">
                                    <a href="https://twitter.com/MarshMcLennan" class="social__custom"
                                        rel="nofollow noopener noreferrer" target="_blank"
                                        ><span style="display:none">Twitter</span>
                                        <svg width="34" height="34" viewBox="0 0 34 34" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" clipRule="evenodd"
                                                d="M16.7734 0.272705C7.66028 0.272705 0.273438 7.65955 0.273438 16.7727C0.273438 25.8848 7.66028 33.2727 16.7734 33.2727C25.8866 33.2727 33.2734 25.8848 33.2734 16.7727C33.2734 7.65955 25.8866 0.272705 16.7734 0.272705"
                                                fill="#009DE0"></path>
                                            <path fillRule="evenodd" clipRule="evenodd"
                                                d="M23.3352 13.4078C23.3414 13.5533 23.3455 13.6987 23.3455 13.8461C23.3455 18.3187 19.9404 23.477 13.7137 23.477C11.8017 23.477 10.0228 22.917 8.52441 21.9569C8.78945 21.9878 9.0586 22.0033 9.33188 22.0033C10.9179 22.0033 12.3772 21.4629 13.5363 20.5544C12.0544 20.5276 10.8045 19.5489 10.3734 18.2042C10.5807 18.2434 10.7921 18.264 11.0108 18.264C11.3191 18.264 11.6182 18.2228 11.9028 18.1454C10.3539 17.835 9.18751 16.4665 9.18751 14.8268C9.18751 14.8124 9.18751 14.798 9.18751 14.7835C9.64332 15.0372 10.1662 15.1898 10.721 15.2074C9.81245 14.6 9.21432 13.5636 9.21432 12.39C9.21432 11.7692 9.38138 11.1876 9.67323 10.6874C11.3428 12.7355 13.8374 14.0833 16.6507 14.2246C16.5929 13.9771 16.563 13.7183 16.563 13.4532C16.563 11.5836 18.0789 10.0676 19.9476 10.0676C20.9221 10.0676 21.8018 10.4791 22.4184 11.137C23.1898 10.9854 23.9148 10.7039 24.5686 10.3162C24.3159 11.1061 23.7787 11.7692 23.0805 12.1889C23.7653 12.1064 24.417 11.9249 25.0244 11.6558C24.5707 12.3343 23.9963 12.9304 23.3352 13.4078"
                                                fill="white"></path>
                                        </svg>

                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="footer-v3__container--middle--links">
                        <ul class="footer-v3__container--middle--links--list">
                            <li class="footer-v3__container--middle--links--list--item typographyStyles-body-medium">
                                <a href="/terms-of-use.html" target="_self">Terms Of Use</a>
                            </li>
                            <li class="footer-v3__container--middle--links--list--item typographyStyles-body-medium">
                                <a href="/privacy-statement.html" target="_self">Privacy Notice</a>
                            </li>
                            <li class="footer-v3__container--middle--links--list--item typographyStyles-body-medium">
                                <a href="/california-resident-privacy-notice.html" target="_self">CA Privacy</a>
                            </li>
                            <li class="footer-v3__container--middle--links--list--item typographyStyles-body-medium">
                                <a href="/accessibility.html" target="_self">Accessibility</a>
                            </li>
                            <li class="footer-v3__container--middle--links--list--item typographyStyles-body-medium">
                                <a href="/suppliers.html" target="_self">Suppliers </a>
                            </li>
                            <li class="footer-v3__container--middle--links--list--item typographyStyles-body-medium">
                                <a href="/cookie-notice.html" target="_self">Cookie Notice</a>
                            </li>

                            <li class="footer_tc truste_caIcon_display footer-v3__container--middle--links--list--item typographyStyles-body-medium"
                                id="teconsent" consent="undefined" aria-label="Open Cookie Preferences Modal"
                                role="complementary"><a role="link" id="icon-id07781889232312198" tabindex="0" lang="en"
                                    aria-haspopup="true" aria-label="Cookie Preferences" style="cursor: pointer;">Manage
                                    Cookies</a></li>
                        </ul>
                    </div>
                </div>
                <div class="footer-v3__container--bottom">
                    <ul class="footer-v3__container--bottom--list">
                        <li class="footer-v3__container--bottom--list--item">
                            <span class="typographyStyles-body-small">© 2023 Marsh &amp; McLennan Companies, Inc. All Rights Reserved. </span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </footer>
</div>
<style>
.site-footer--new {
    background: #242525;
}
.site-footer--new ul {
    padding: 0;
}
.site-footer--new li {
    list-style: none;
    margin: 0;
    display: inline-block;
}
.site-footer--new li a {
    text-decoration: none;
}
.site-footer--new .container-footer {
    padding: 0 0.5rem;
}
.site-footer--new .container-footer .grid > .section {
    display: flex;
    align-items: center;
    justify-content: center;
}
.site-footer--new .container-footer .grid .hidden {
    display: none;
}
.site-footer--new .container-footer .article__row ul.split > .section {
    display: flex;
    align-items: center;
    justify-content: center;
}
.site-footer--new .container-footer .article__row ul.split .hidden {
    display: none;
}
.site-footer--new .container-footer .article__row ol.split > .section {
    display: flex;
    align-items: center;
    justify-content: center;
}
.site-footer--new .container-footer .article__row ol.split .hidden {
    display: none;
}
.site-footer--new .container-footer .article__row--restrained ul.split > .section {
    display: flex;
    align-items: center;
    justify-content: center;
}
.site-footer--new .container-footer .article__row--restrained ul.split .hidden {
    display: none;
}
.site-footer--new .container-footer .article__row--restrained ol.split > .section {
    display: flex;
    align-items: center;
    justify-content: center;
}
.site-footer--new .container-footer .article__row--restrained ol.split .hidden {
    display: none;
}
.site-footer--new .container-footer .impact-section__row ul.split > .section {
    display: flex;
    align-items: center;
    justify-content: center;
}
.site-footer--new .container-footer .impact-section__row ul.split .hidden {
    display: none;
}
.site-footer--new .container-footer .impact-section__row ol.split > .section {
    display: flex;
    align-items: center;
    justify-content: center;
}
.site-footer--new .container-footer .impact-section__row ol.split .hidden {
    display: none;
}
.site-footer--new .container-footer .article__row__list.split > .section {
    display: flex;
    align-items: center;
    justify-content: center;
}
.site-footer--new .container-footer .article__row__list.split .hidden {
    display: none;
}
.site-footer--new a {
    text-transform: uppercase;
}
.site-footer--new .social.site-footer--new__social li:hover {
    color: #009de0;
}
.site-footer--new .social.site-footer--new__social li:not(:nth-child(2)) {
    margin: 0 0 0 1rem;
}
.site-footer--new .social.site-footer--new__social li:nth-child(2) {
    margin: 0;
}
.site-footer--new .social-share-icons a svg {
    width: 32px;
    height: 32px;
    transform: translateY(0.5px);
}
.article__row .site-footer--new .container-footer ul.split > .section {
    display: flex;
    align-items: center;
    justify-content: center;
}
.article__row .site-footer--new .container-footer ul.split .hidden {
    display: none;
}
.article__row .site-footer--new .container-footer ol.split > .section {
    display: flex;
    align-items: center;
    justify-content: center;
}
.article__row .site-footer--new .container-footer ol.split .hidden {
    display: none;
}
.article__row--restrained .site-footer--new .container-footer ul.split > .section {
    display: flex;
    align-items: center;
    justify-content: center;
}
.article__row--restrained .site-footer--new .container-footer ul.split .hidden {
    display: none;
}
.article__row--restrained .site-footer--new .container-footer ol.split > .section {
    display: flex;
    align-items: center;
    justify-content: center;
}
.article__row--restrained .site-footer--new .container-footer ol.split .hidden {
    display: none;
}
.impact-section__row .site-footer--new .container-footer ul.split > .section {
    display: flex;
    align-items: center;
    justify-content: center;
}
.impact-section__row .site-footer--new .container-footer ul.split .hidden {
    display: none;
}
.impact-section__row .site-footer--new .container-footer ol.split > .section {
    display: flex;
    align-items: center;
    justify-content: center;
}
.impact-section__row .site-footer--new .container-footer ol.split .hidden {
    display: none;
}
.site-footer--new__logo {
    background-size: cover;
    background-repeat: no-repeat;
    height: 32px;
    height: 3.2rem;
    width: 224px;
    width: 22.4rem;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 1.5rem;
}
.site-footer--new__logo img {
    height: 19px;
    height: 1.9rem;
    width: 213px;
    width: 21.3rem;
    max-width: 152%;
}
.site-footer--new__navigation {
    padding: 0;
    margin: 0;
    list-style: none;
    margin: 30px 0 20px;
    margin: 3rem 0 2rem;
    list-style-type: none;
    padding: 0;
    margin: 0;
    overflow: hidden;
    margin: 0 0 40px;
    margin: 0 0 4rem;
    display: flex;
    flex-direction: column;
}
.site-footer--new__navigation li {
    list-style: none;
    vertical-align: middle;
    margin: 0 !important;
    padding: 0 15px;
    padding: 0 1.5rem;
    text-align: center;
}
.site-footer--new__navigation li a {
    color: #009de0;
    color: #009de0;
    font-size: 1.7rem;
    line-height: 2.2rem;
}
.site-footer--new__navigation li a:hover {
    padding-bottom: 0 !important;
    padding-bottom: 0 !important;
}
.site-footer--new__navigation li a.selected {
    color: #fff;
}
.site-footer--new__navigation li:first-of-type {
    padding: 0 0 1rem 0;
}
.site-footer--new__navigation li.current-page a {
    color: #fff;
}
.site-footer--new__navigation > li {
    float: left;
    margin-right: 15px;
    margin-right: 1.5rem;
}
.site-footer--new__navigation > li:last-child {
    margin-right: 0;
}
.site-footer--new__navigation > li a {
    display: inline-block;
    color: #000;
}
.site-footer--new__social {
    padding: 0;
    margin: 0;
    list-style: none;
    list-style-type: none;
    padding: 0;
    margin: 0;
    overflow: hidden;
}
.site-footer--new__social li {
    margin: 0;
}
.site-footer--new__social li:first-of-type {
    margin: 0;
    display: none;
}
.site-footer--new__social li a {
    color: #fff;
}
.site-footer--new__social li a:hover {
    padding-bottom: 0 !important;
    color: white;
}
.site-footer--new__social > li {
    float: left;
    margin-right: 15px;
    margin-right: 1.5rem;
}
.site-footer--new__social > li:last-child {
    margin-right: 0;
}
.site-footer--new__social > li a {
    display: inline-block;
    color: #000;
}
.site-footer--new__tc {
    padding: 0;
    margin: 0;
    list-style: none;
    list-style-type: none;
    padding: 0;
    margin: 0;
    overflow: hidden;
    margin-top: 0;
}
.site-footer--new__tc li.footer_tc {
    margin-right: 0.5rem;
}
.site-footer--new__tc li a {
    color: #fff;
    text-transform: none;
    font-size: 1.6rem;
    color: #fff;
}
.site-footer--new__tc li:after {
    content: "|";
    margin: 0 10px;
    color: white;
}
.site-footer--new__tc li:last-child:after {
    content: "";
    margin: 0;
}
.site-footer--new__tc li:not(:last-child) a {
    margin-right: 0.5rem;
}
.site-footer--new__tc > li {
    float: left;
    margin-right: 15px;
    margin-right: 1.5rem;
}
.site-footer--new__tc > li:last-child {
    margin-right: 0;
}
.site-footer--new__tc > li a {
    display: inline-block;
    color: #000;
}
.site-footer--new__social.social a {
    font-size: 32px;
    font-size: 3.2rem;
}
.site-footer--new__top {
    padding: 30px 15px 20px;
    padding: 3rem 1.5rem 2rem;
}
.site-footer--new__top .social {
    margin: 1rem 0 2rem 0rem;
    display: block;
    display: block;
}
.site-footer--new__middle {
    padding: 0 5px;
    padding: 0rem 0.5rem;
}
.site-footer--new__middle .copyright-mobile {
    display: flex;
    padding: 2rem 0;
}
.site-footer--new__bottom {
    margin-top: 10px;
    margin-top: 1rem;
    padding: 30px 15px 30px;
    padding: 3rem 1.5rem 3rem;
    background: black;
}
.site-footer--new__bottom .social {
    margin-bottom: 15px;
    margin-bottom: 1.5rem;
    text-align: center;
    display: none;
}
.site-footer--new__copyright {
    color: #fff;
    display: block;
    margin: auto;
    width: auto;
    font-size: 1.6rem;
    display: flex;
    justify-content: flex-end;
    width: auto;
}
.site-footer--new__navigation--sub-items {
    display: flex;
}
.site-footer--new__navigation--sub-items li:first-of-type {
    padding: 0 1.5rem 0rem 1.5rem;
}
.site-footer--new__app {
    display: flex;
    flex-direction: column;
    align-items: center;
}
.site-footer--new__app--text {
    width: 100%;
    padding-bottom: 2rem;
}
.site-footer--new__app--text p {
    color: white;
    margin: 0;
    line-height: 1.3;
    font-size: 1.8rem;
    shape-outside: inset(50%);
    text-align: center;
    letter-spacing: normal;
    font-weight: 700 !important;
}
.site-footer--new__app--text p span {
    color: white;
    font-family: "MMC Display Condensed", Futura, "sans-serif";
    text-transform: uppercase;
    font-size: 1.8rem;
}
.site-footer--new__app--apps {
    padding-left: 0;
}
.site-footer--new__app--apps .google-play-badge {
    height: 34px;
}
.site-footer--new__app--apps .app-badge {
    height: 34px;
}
.site-footer--new__app--apps .appstore-badge {
    height: 35px;
}
.site-footer--new__app--apps > a {
    margin-left: 1rem;
}
footer.site-footer--new .footer-v3__container {
    margin: 0 auto;
    width: 100%;
    box-sizing: border-box;
    padding: 44px 0 18px 0;
}
footer.site-footer--new .footer-v3__container .social-share-icons path.custom-social-v3 {
    fill: #202020;
}
footer.site-footer--new .footer-v3__container--top {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-bottom: 30px;
}
footer.site-footer--new .footer-v3__container--top--marsh {
    margin-bottom: 50px;
}
footer.site-footer--new .footer-v3__container--top--marsh--logo {
    text-align: center;
    margin-bottom: 21px;
}
footer.site-footer--new .footer-v3__container--top--marsh--logo--image {
    width: 246px;
    height: 20px;
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    display: inline-block;
}
footer.site-footer--new .footer-v3__container--top--marsh--logo--image img {
    height: 20px;
    width: auto;
}
footer.site-footer--new .footer-v3__container--top--marsh--desc {
    margin: 0 auto;
    width: 100%;
    max-width: 370px;
    text-align: center;
}
footer.site-footer--new .footer-v3__container--top--marsh--desc p {
    color: #fff;
    font-size: 10px;
    line-height: 1.5;
    display: inline-block;
    font-weight: bold;
}
footer.site-footer--new .footer-v3__container--top--partners--list {
    display: flex;
    flex-direction: row;
    justify-content: center;
}
footer.site-footer--new .footer-v3__container--top--partners--list--item {
    margin-right: 5px;
}
footer.site-footer--new .footer-v3__container--top--partners--list--item:last-child {
    margin-right: 0;
}
footer.site-footer--new .footer-v3__container--top--partners--list--item--link img {
    height: 14px;
}
footer.site-footer--new .footer-v3__container--middle--social {
    margin-bottom: 24px;
    box-sizing: border-box;
    font-family: "Source Sans Pro", Lucida Grande, Lucida Sans Unicode, Lucida Sans, Geneva, Verdana, sans-serif;
}
footer.site-footer--new .footer-v3__container--middle--social--list {
    display: flex;
    justify-content: center;
    flex-direction: row;
}
footer.site-footer--new .footer-v3__container--middle--social--list--item {
    margin-right: 7px;
    height: 25px;
}
footer.site-footer--new .footer-v3__container--middle--social--list--item:last-child {
    margin-right: 0;
}
footer.site-footer--new .footer-v3__container--middle--social--list--item a {
    font-size: 25px;
    color: #fff !important;
    fill: #fff !important;
    display: inline-block;
    height: 25px;
}
footer.site-footer--new .footer-v3__container--middle--social--list--item a::before {
    color: #fff !important;
    fill: #fff !important;
}
footer.site-footer--new .footer-v3__container--middle--social--list--item a:hover {
    color: #3172f3 !important;
    fill: #3172f3 !important;
}
footer.site-footer--new .footer-v3__container--middle--social--list--item a:hover::before {
    color: #3172f3 !important;
    fill: #3172f3 !important;
}
footer.site-footer--new .footer-v3__container--middle--social--list--item a svg {
    width: 25px;
    height: 25px;
}
footer.site-footer--new .footer-v3__container--middle--links {
    margin: 0 auto;
    width: 100%;
    box-sizing: border-box;
    margin-bottom: 30px;
}
footer.site-footer--new .footer-v3__container--middle--links--list {
    display: flex;
    flex-direction: row;
    justify-content: center;
    flex-wrap: wrap;
}
footer.site-footer--new .footer-v3__container--middle--links--list--item {
    margin-right: 13px;
    margin-bottom: 20px;
}
footer.site-footer--new .footer-v3__container--middle--links--list--item:last-child {
    margin-right: 0;
}
footer.site-footer--new .footer-v3__container--middle--links--list--item a {
    font-size: 9px;
    color: #fff;
    display: inline-block;
    text-transform: none;
}
footer.site-footer--new .footer-v3__container--bottom--list {
    display: flex;
    justify-content: center;
}
footer.site-footer--new .footer-v3__container--bottom--list--item {
    text-align: center;
}
footer.site-footer--new .footer-v3__container--bottom--list--item a {
    font-size: 10px;
    color: #fff;
    text-transform: none;
}
footer.site-footer--new .footer-v3__container--bottom--list--item a:hover {
    color: #fff !important;
}
footer.site-footer--new .footer-v3__container--bottom--list--item span {
    font-size: 10px;
    color: #fff;
    text-transform: none;
}
footer.site-footer--new .footer-v3__container--bottom--list--item span:hover {
    color: #fff !important;
}
.media-center-v3--banner {
    padding: 0 10px;
    background: #000;
}
.media-center-v3--banner .grid {
    margin: 0;
}
.media-center-v3--banner--title {
    padding: 40px 0;
}
@media screen and (min-width: 960px) {
    .site-footer--new .container-footer .grid {
        display: flex;
        flex-direction: row;
        align-items: center;
   }
    .site-footer--new .container-footer .grid > .section {
        display: block;
   }
    .site-footer--new .container-footer .grid .hidden {
        display: block;
   }
    .site-footer--new .container-footer .article__row ul.split {
        display: flex;
        flex-direction: row;
        align-items: center;
   }
    .site-footer--new .container-footer .article__row ul.split > .section {
        display: block;
   }
    .site-footer--new .container-footer .article__row ul.split .hidden {
        display: block;
   }
    .site-footer--new .container-footer .article__row ol.split {
        display: flex;
        flex-direction: row;
        align-items: center;
   }
    .site-footer--new .container-footer .article__row ol.split > .section {
        display: block;
   }
    .site-footer--new .container-footer .article__row ol.split .hidden {
        display: block;
   }
    .site-footer--new .container-footer .article__row--restrained ul.split {
        display: flex;
        flex-direction: row;
        align-items: center;
   }
    .site-footer--new .container-footer .article__row--restrained ul.split > .section {
        display: block;
   }
    .site-footer--new .container-footer .article__row--restrained ul.split .hidden {
        display: block;
   }
    .site-footer--new .container-footer .article__row--restrained ol.split {
        display: flex;
        flex-direction: row;
        align-items: center;
   }
    .site-footer--new .container-footer .article__row--restrained ol.split > .section {
        display: block;
   }
    .site-footer--new .container-footer .article__row--restrained ol.split .hidden {
        display: block;
   }
    .site-footer--new .container-footer .impact-section__row ul.split {
        display: flex;
        flex-direction: row;
        align-items: center;
   }
    .site-footer--new .container-footer .impact-section__row ul.split > .section {
        display: block;
   }
    .site-footer--new .container-footer .impact-section__row ul.split .hidden {
        display: block;
   }
    .site-footer--new .container-footer .impact-section__row ol.split {
        display: flex;
        flex-direction: row;
        align-items: center;
   }
    .site-footer--new .container-footer .impact-section__row ol.split > .section {
        display: block;
   }
    .site-footer--new .container-footer .impact-section__row ol.split .hidden {
        display: block;
   }
    .site-footer--new .container-footer .article__row__list.split {
        display: flex;
        flex-direction: row;
        align-items: center;
   }
    .site-footer--new .container-footer .article__row__list.split > .section {
        display: block;
   }
    .site-footer--new .container-footer .article__row__list.split .hidden {
        display: block;
   }
    .article__row .site-footer--new .container-footer ul.split {
        display: flex;
        flex-direction: row;
        align-items: center;
   }
    .article__row .site-footer--new .container-footer ul.split > .section {
        display: block;
   }
    .article__row .site-footer--new .container-footer ul.split .hidden {
        display: block;
   }
    .article__row .site-footer--new .container-footer ol.split {
        display: flex;
        flex-direction: row;
        align-items: center;
   }
    .article__row .site-footer--new .container-footer ol.split > .section {
        display: block;
   }
    .article__row .site-footer--new .container-footer ol.split .hidden {
        display: block;
   }
    .article__row--restrained .site-footer--new .container-footer ul.split {
        display: flex;
        flex-direction: row;
        align-items: center;
   }
    .article__row--restrained .site-footer--new .container-footer ul.split > .section {
        display: block;
   }
    .article__row--restrained .site-footer--new .container-footer ul.split .hidden {
        display: block;
   }
    .article__row--restrained .site-footer--new .container-footer ol.split {
        display: flex;
        flex-direction: row;
        align-items: center;
   }
    .article__row--restrained .site-footer--new .container-footer ol.split > .section {
        display: block;
   }
    .article__row--restrained .site-footer--new .container-footer ol.split .hidden {
        display: block;
   }
    .impact-section__row .site-footer--new .container-footer ul.split {
        display: flex;
        flex-direction: row;
        align-items: center;
   }
    .impact-section__row .site-footer--new .container-footer ul.split > .section {
        display: block;
   }
    .impact-section__row .site-footer--new .container-footer ul.split .hidden {
        display: block;
   }
    .impact-section__row .site-footer--new .container-footer ol.split {
        display: flex;
        flex-direction: row;
        align-items: center;
   }
    .impact-section__row .site-footer--new .container-footer ol.split > .section {
        display: block;
   }
    .impact-section__row .site-footer--new .container-footer ol.split .hidden {
        display: block;
   }
    .site-footer--new__logo {
        margin: 0 15px 0 0;
        margin: 0 1.5rem 0 0;
        display: inline-block;
   }
    .site-footer--new__tc {
        display: flex;
        justify-content: flex-end;
   }
    .site-footer--new__tc li.footer_tc {
        margin-right: 1.5rem;
   }
    .site-footer--new__tc li a {
        font-size: 1.4rem;
   }
    .site-footer--new__tc li:not(:last-child) a {
        margin-right: 1rem;
   }
    .site-footer--new__navigation {
        margin: 30px 0 0;
        margin: 3rem 0 0;
        padding-left: 1px;
        display: block;
        margin: 0;
        margin: 0;
   }
    .site-footer--new__navigation li:first-of-type {
        padding: 0 1.5rem 0 0;
   }
    .site-footer--new__top {
        padding: 40px 15px 20px;
        padding: 4rem 1.5rem 2rem;
   }
    .site-footer--new__top .social {
        margin: 0;
   }
    .site-footer--new__middle {
        margin: 40px 0 40px 0;
        margin: 4rem 0rem 4rem 0rem;
        padding: 0 15px;
        padding: 0rem 1.5rem;
   }
    .site-footer--new__middle .copyright-mobile {
        display: none;
   }
    .site-footer--new__bottom {
        padding: 20px 15px 30px;
        padding: 2rem 1.5rem 3rem;
   }
    .site-footer--new__copyright {
        width: 150px;
   }
    .site-footer--new__app {
        flex-direction: row;
   }
    .site-footer--new__app--text {
        width: 44%;
        padding-bottom: 0;
   }
    .site-footer--new__app--text p {
        font-size: 1.5rem;
        text-align: left;
   }
    .site-footer--new__app--text p span {
        font-size: 1.5rem;
   }
    .site-footer--new__app--apps {
        padding-left: 1rem;
   }
    footer.site-footer--new .footer-v3__container--top {
        flex-direction: row;
        margin-bottom: 47px;
   }
    footer.site-footer--new .footer-v3__container--top--marsh {
        width: 50%;
        max-width: 550px;
        margin-bottom: 0;
   }
    footer.site-footer--new .footer-v3__container--top--marsh--logo {
        text-align: left;
   }
    footer.site-footer--new .footer-v3__container--top--marsh--logo--image {
        width: 342px;
        height: 28px;
   }
    footer.site-footer--new .footer-v3__container--top--marsh--logo--image img {
        width: auto;
        height: 28px;
   }
    footer.site-footer--new .footer-v3__container--top--marsh--desc {
        text-align: left;
        max-width: 100%;
   }
    footer.site-footer--new .footer-v3__container--top--marsh--desc p {
        font-size: 14px;
   }
    footer.site-footer--new .footer-v3__container--top--partners {
        max-width: 50%;
   }
    footer.site-footer--new .footer-v3__container--top--partners--list {
        flex-wrap: wrap;
        justify-content: flex-end;
        padding-top: 10px;
   }
    footer.site-footer--new .footer-v3__container--top--partners--list--item {
        margin-bottom: 10px;
   }
    footer.site-footer--new .footer-v3__container--top--partners--list--item--link img {
        height: 19px;
   }
    footer.site-footer--new .footer-v3__container--middle {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 9px;
   }
    footer.site-footer--new .footer-v3__container--middle--social {
        order: 2;
        width: 50%;
   }
    footer.site-footer--new .footer-v3__container--middle--social--list {
        justify-content: flex-end;
   }
    footer.site-footer--new .footer-v3__container--middle--links {
        order: 1;
        width: 50%;
        max-width: 856px;
        margin-bottom: 0;
   }
    footer.site-footer--new .footer-v3__container--middle--links--list {
        justify-content: space-between;
   }
    footer.site-footer--new .footer-v3__container--middle--links--list::after {
        content: "";
        flex: auto;
   }
    footer.site-footer--new .footer-v3__container--middle--links--list--item {
        margin-bottom: 15px;
        margin-right: 25px;
   }
    footer.site-footer--new .footer-v3__container--middle--links--list--item a {
        font-size: 14px;
   }
    footer.site-footer--new .footer-v3__container--bottom--list {
        justify-content: flex-start;
   }
    footer.site-footer--new .footer-v3__container--bottom--list--item {
        text-align: left;
   }
    footer.site-footer--new .footer-v3__container--bottom--list--item a {
        font-size: 13px;
   }
    footer.site-footer--new .footer-v3__container--bottom--list--item span {
        font-size: 13px;
   }
}
@media screen and (min-width: 320px) {
    .site-footer--new__logo img {
        height: 22px;
        height: 2.2rem;
        width: 246px;
        width: 24.6rem;
   }
}
@media screen and (min-width: 480px) {
    .site-footer--new__logo img {
        height: 28px;
        height: 2.8rem;
        width: 320px;
        width: 32rem;
   }
}
@media (max-width: 360px) {
    .site-footer--new__tc li a {
        font-size: 4vw;
   }
}
@media screen and (min-width: 1200px) {
    .site-footer--new__tc li a {
        font-size: 1.7rem;
   }
    .site-footer--new__navigation {
        margin-top: 0;
        padding-left: 1px;
   }
}
@media screen and (max-width: 479px) {
    .site-footer--new__social.social {
        text-align: center;
        margin: 5px auto 25px;
        margin: 0.5rem auto 2.5rem;
   }
    .site-footer--new__social.social a {
        color: #fff;
        font-size: 32px;
        font-size: 3.2rem;
   }
}
@media screen and (min-width: 360px) {
    footer.site-footer--new .footer-v3__container--top--partners--list--item {
        margin-right: 15px;
   }
}
@media screen and (min-width: 1024px) {
    footer.site-footer--new .footer-v3__container--middle--social {
        width: 33%;
   }
    footer.site-footer--new .footer-v3__container--middle--links {
        width: 66%;
        margin: 0;
   }
}

</style>
`;

const HTMLSOURCE = `
<!-- HTML -->
<footer class="site-footer--new">
    <div class="footer-v3__container">
        <div class="container">
            <div class="footer-v3__container--top">
                <div class="footer-v3__container--top--marsh">
                    <div class="footer-v3__container--top--marsh--logo">
                        <div class="footer-v3__container--top--marsh--logo--image">
                            <a target="_self" href="https://www.marshmclennan.com">
                                <img src="./atlas-logos/logo-white.svg" alt="Marsh Mclennan Company Logo">
                            </a>

                        </div>
                    </div>
                    <div class="footer-v3__container--top--marsh--desc">
                        <p class="typographyStyles-mobile-heading-small">Marsh McLennan is the leader in risk, strategy and people, helping clients
                            navigate a dynamic environment through four global businesses.</p>
                    </div>
                </div>
                <div class="footer-v3__container--top--partners">
                    <ul class="footer-v3__container--top--partners--list">
                        <li class="footer-v3__container--top--partners--list--item">
                            <a target="_self" href="https://www.marsh.com"
                                class="footer-v3__container--top--partners--list--item--link">
                                <img src="./atlas-logos/Marsh.svg" alt="Marsh">
                            </a>
                        </li>
                        <li class="footer-v3__container--top--partners--list--item">
                            <a target="_self" href="https://www.guycarp.com"
                                class="footer-v3__container--top--partners--list--item--link">
                                <img src="./atlas-logos/GuyCarpenter.svg" alt="GuyCarpenter">
                            </a>
                        </li>
                        <li class="footer-v3__container--top--partners--list--item">
                            <a target="_self" href="https://www.mercer.com"
                                class="footer-v3__container--top--partners--list--item--link">
                                <img src="./atlas-logos/Mercer.svg" alt="Mercer">
                            </a>
                        </li>
                        <li class="footer-v3__container--top--partners--list--item">
                            <a target="_self" href="https://www.oliverwyman.com"
                                class="footer-v3__container--top--partners--list--item--link">
                                <img src="./atlas-logos/OliverWyman.svg" alt="OliverWyman">
                            </a>
                        </li>

                    </ul>
                </div>
            </div>
            <div class="footer-v3__container--middle">
                <div class="footer-v3__container--middle--social">
                    <div class="site-footer--new__social social footer-v3__container--middle--social--list">

                        <ul class="social-share-icons">

                            <li>Share</li>
                            <li class="social-share-icon-1">
                                <a href="https://www.instagram.com/marshmclennan/" class="social__custom"
                                    rel="nofollow noopener noreferrer" target="_blank"
                                    ><span style="display:none">Instagram</span>
                                    <svg width="33" height="34" viewBox="0 0 33 34" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <g clip-path="url(#clip0)">
                                            <circle cx="16.5" cy="16.7727" r="16.5" fill="#009DE0"></circle>
                                            <g clip-path="url(#clip1)">
                                                <path
                                                    d="M16.4998 9.04311C19.0174 9.04311 19.3156 9.0527 20.3098 9.09806C21.2291 9.14001 21.7283 9.29361 22.0606 9.4227C22.5006 9.59374 22.8147 9.79809 23.1447 10.128C23.4746 10.4579 23.6789 10.772 23.8499 11.2121C23.9791 11.5444 24.1327 12.0436 24.1746 12.9629C24.22 13.9571 24.2296 14.2553 24.2296 16.7728C24.2296 19.2904 24.22 19.5886 24.1746 20.5828C24.1327 21.502 23.9791 22.0013 23.8499 22.3335C23.6789 22.7736 23.4746 23.0877 23.1447 23.4177C22.8147 23.7476 22.5006 23.9519 22.0606 24.1229C21.7283 24.252 21.2291 24.4056 20.3098 24.4476C19.3157 24.493 19.0175 24.5025 16.4998 24.5025C13.9821 24.5025 13.684 24.493 12.6899 24.4476C11.7706 24.4056 11.2714 24.252 10.9392 24.1229C10.4991 23.9519 10.1849 23.7476 9.85502 23.4177C9.5251 23.0877 9.32075 22.7736 9.14975 22.3335C9.02063 22.0013 8.86703 21.502 8.82507 20.5828C8.77971 19.5886 8.77013 19.2904 8.77013 16.7728C8.77013 14.2553 8.77971 13.9571 8.82507 12.9629C8.86703 12.0436 9.02063 11.5444 9.14975 11.2121C9.32075 10.772 9.5251 10.4579 9.85502 10.128C10.1849 9.79809 10.4991 9.59374 10.9392 9.4227C11.2714 9.29361 11.7706 9.14001 12.6899 9.09806C13.6841 9.0527 13.9823 9.04311 16.4998 9.04311ZM16.4998 7.34424C13.9392 7.34424 13.6181 7.35509 12.6125 7.40098C11.6089 7.44679 10.9235 7.60615 10.3238 7.83924C9.70374 8.0802 9.17793 8.40259 8.65377 8.92675C8.12961 9.45092 7.80721 9.97673 7.56626 10.5967C7.33316 11.1965 7.1738 11.8819 7.12799 12.8855C7.08211 13.8911 7.07129 14.2122 7.07129 16.7728C7.07129 19.3335 7.08211 19.6546 7.12799 20.6602C7.1738 21.6638 7.33316 22.3492 7.56626 22.9489C7.80721 23.5689 8.12961 24.0947 8.65377 24.6189C9.17793 25.1431 9.70374 25.4655 10.3238 25.7064C10.9235 25.9395 11.6089 26.0989 12.6125 26.1447C13.6181 26.1906 13.9392 26.2014 16.4998 26.2014C19.0605 26.2014 19.3816 26.1906 20.3872 26.1447C21.3908 26.0989 22.0762 25.9395 22.6759 25.7064C23.2959 25.4655 23.8218 25.1431 24.3459 24.6189C24.8701 24.0947 25.1925 23.5689 25.4334 22.9489C25.6665 22.3492 25.8259 21.6638 25.8717 20.6602C25.9176 19.6546 25.9284 19.3335 25.9284 16.7728C25.9284 14.2122 25.9176 13.8911 25.8717 12.8855C25.8259 11.8819 25.6665 11.1965 25.4334 10.5967C25.1925 9.97673 24.8701 9.45092 24.3459 8.92675C23.8218 8.40259 23.2959 8.0802 22.6759 7.83924C22.0762 7.60615 21.3908 7.44679 20.3872 7.40098C19.3816 7.35509 19.0605 7.34424 16.4998 7.34424ZM16.4998 11.9311C13.8258 11.9311 11.6581 14.0988 11.6581 16.7728C11.6581 19.4468 13.8258 21.6145 16.4998 21.6145C19.1738 21.6145 21.3416 19.4468 21.3416 16.7728C21.3416 14.0988 19.1738 11.9311 16.4998 11.9311ZM16.4998 19.9157C14.7641 19.9157 13.357 18.5086 13.357 16.7728C13.357 15.0371 14.7641 13.63 16.4998 13.63C18.2356 13.63 19.6427 15.0371 19.6427 16.7728C19.6427 18.5086 18.2356 19.9157 16.4998 19.9157ZM22.6643 11.7398C22.6643 12.3647 22.1577 12.8713 21.5328 12.8713C20.908 12.8713 20.4014 12.3647 20.4014 11.7398C20.4014 11.1149 20.908 10.6084 21.5328 10.6084C22.1577 10.6084 22.6643 11.1149 22.6643 11.7398Z"
                                                    fill="white"></path>
                                            </g>
                                        </g>
                                        <defs>
                                            <clipPath id="clip0">
                                                <rect width="33" height="33" fill="white"
                                                    transform="translate(0 0.272705)"></rect>
                                            </clipPath>
                                            <clipPath id="clip1">
                                                <rect width="18.8571" height="18.8571" fill="white"
                                                    transform="translate(7.07129 7.34424)"></rect>
                                            </clipPath>
                                        </defs>
                                    </svg>

                                </a>
                            </li>
                            <li class="social-share-icon-2">
                                <a href="https://www.linkedin.com/company/marshmclennan/" class="social__custom"
                                    rel="nofollow noopener noreferrer" target="_blank"
                                    ><span style="display:none">LinkedIn</span>
                                    <svg width="34" height="34" viewBox="0 0 34 34" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" clipRule="evenodd"
                                            d="M17.2266 0.272705C8.11341 0.272705 0.726562 7.65955 0.726562 16.7727C0.726562 25.8848 8.11341 33.2727 17.2266 33.2727C26.3397 33.2727 33.7266 25.8848 33.7266 16.7727C33.7266 7.65955 26.3397 0.272705 17.2266 0.272705V0.272705Z"
                                            fill="#009DE0"></path>
                                        <path fillRule="evenodd" clipRule="evenodd"
                                            d="M25.4765 25.0073H22.0579V19.6572C22.0579 18.3815 22.0352 16.7408 20.2811 16.7408C18.5021 16.7408 18.2309 18.1309 18.2309 19.5664V25.0073H14.8154V14.0059H18.0927V15.5105H18.1402C18.596 14.6453 19.7118 13.7327 21.3752 13.7327C24.8371 13.7327 25.4765 16.0107 25.4765 18.9735V25.0073Z"
                                            fill="white"></path>
                                        <path fillRule="evenodd" clipRule="evenodd"
                                            d="M10.9617 12.5033C9.86338 12.5033 8.97754 11.6144 8.97754 10.5202C8.97754 9.42605 9.86338 8.53711 10.9617 8.53711C12.0548 8.53711 12.9427 9.42605 12.9427 10.5202C12.9427 11.6144 12.0548 12.5033 10.9617 12.5033V12.5033Z"
                                            fill="white"></path>
                                        <path fillRule="evenodd" clipRule="evenodd"
                                            d="M12.6717 25.0072H9.24902V14.0059H12.6717V25.0072Z" fill="white"></path>
                                    </svg>

                                </a>
                            </li>
                            <li class="social-share-icon-3">
                                <a href="https://twitter.com/MarshMcLennan" class="social__custom"
                                    rel="nofollow noopener noreferrer" target="_blank"
                                    ><span style="display:none">Twitter</span>
                                    <svg width="34" height="34" viewBox="0 0 34 34" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" clipRule="evenodd"
                                            d="M16.7734 0.272705C7.66028 0.272705 0.273438 7.65955 0.273438 16.7727C0.273438 25.8848 7.66028 33.2727 16.7734 33.2727C25.8866 33.2727 33.2734 25.8848 33.2734 16.7727C33.2734 7.65955 25.8866 0.272705 16.7734 0.272705"
                                            fill="#009DE0"></path>
                                        <path fillRule="evenodd" clipRule="evenodd"
                                            d="M23.3352 13.4078C23.3414 13.5533 23.3455 13.6987 23.3455 13.8461C23.3455 18.3187 19.9404 23.477 13.7137 23.477C11.8017 23.477 10.0228 22.917 8.52441 21.9569C8.78945 21.9878 9.0586 22.0033 9.33188 22.0033C10.9179 22.0033 12.3772 21.4629 13.5363 20.5544C12.0544 20.5276 10.8045 19.5489 10.3734 18.2042C10.5807 18.2434 10.7921 18.264 11.0108 18.264C11.3191 18.264 11.6182 18.2228 11.9028 18.1454C10.3539 17.835 9.18751 16.4665 9.18751 14.8268C9.18751 14.8124 9.18751 14.798 9.18751 14.7835C9.64332 15.0372 10.1662 15.1898 10.721 15.2074C9.81245 14.6 9.21432 13.5636 9.21432 12.39C9.21432 11.7692 9.38138 11.1876 9.67323 10.6874C11.3428 12.7355 13.8374 14.0833 16.6507 14.2246C16.5929 13.9771 16.563 13.7183 16.563 13.4532C16.563 11.5836 18.0789 10.0676 19.9476 10.0676C20.9221 10.0676 21.8018 10.4791 22.4184 11.137C23.1898 10.9854 23.9148 10.7039 24.5686 10.3162C24.3159 11.1061 23.7787 11.7692 23.0805 12.1889C23.7653 12.1064 24.417 11.9249 25.0244 11.6558C24.5707 12.3343 23.9963 12.9304 23.3352 13.4078"
                                            fill="white"></path>
                                    </svg>

                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="footer-v3__container--middle--links">
                    <ul class="footer-v3__container--middle--links--list">
                        <li class="footer-v3__container--middle--links--list--item typographyStyles-body-medium">
                            <a href="/terms-of-use.html" target="_self">Terms Of Use</a>
                        </li>
                        <li class="footer-v3__container--middle--links--list--item typographyStyles-body-medium">
                            <a href="/privacy-statement.html" target="_self">Privacy Notice</a>
                        </li>
                        <li class="footer-v3__container--middle--links--list--item typographyStyles-body-medium">
                            <a href="/california-resident-privacy-notice.html" target="_self">CA Privacy</a>
                        </li>
                        <li class="footer-v3__container--middle--links--list--item typographyStyles-body-medium">
                            <a href="/accessibility.html" target="_self">Accessibility</a>
                        </li>
                        <li class="footer-v3__container--middle--links--list--item typographyStyles-body-medium">
                            <a href="/suppliers.html" target="_self">Suppliers </a>
                        </li>
                        <li class="footer-v3__container--middle--links--list--item typographyStyles-body-medium">
                            <a href="/cookie-notice.html" target="_self">Cookie Notice</a>
                        </li>

                        <li class="footer_tc truste_caIcon_display footer-v3__container--middle--links--list--item typographyStyles-body-medium"
                            id="teconsent" consent="undefined" aria-label="Open Cookie Preferences Modal"
                            role="complementary"><a role="link" id="icon-id07781889232312198" tabindex="0" lang="en"
                                aria-haspopup="true" aria-label="Cookie Preferences" style="cursor: pointer;">Manage
                                Cookies</a></li>
                    </ul>
                </div>
            </div>
            <div class="footer-v3__container--bottom">
                <ul class="footer-v3__container--bottom--list">
                    <li class="footer-v3__container--bottom--list--item">
                        <span class="typographyStyles-body-small">© 2023 Marsh &amp; McLennan Companies, Inc. All Rights Reserved. </span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</footer>
`;

const SCSSSOURCE = `
    @import '../../../projects/cdk/scss/atlas-cdk/all';
    $color_1: #009de0;
    $color_2: #fff;
    $color_3: #000;
    $color_4: #3172f3;
    $font-family_1: "MMC Display Condensed",
        Futura,
        "sans-serif";
    $font-family_2: "Source Sans Pro",
        Lucida Grande,
        Lucida Sans Unicode,
        Lucida Sans,
        Geneva,
        Verdana,
        sans-serif;

    .site-footer--new,
    footer.site-footer--new {
        background: #242525;

        ul {
            padding: 0;
        }

        li {
            list-style: none;
            margin: 0;
            display: inline-block;

            a {
                text-decoration: none;
            }
        }

        a {
            text-transform: uppercase;
        }

        .social.site-footer--new__social {
            li {
                &:hover {
                    color: $color_1;
                }

                &:not(:nth-child(2)) {
                    margin: 0 0 0 1rem;
                }

                &:nth-child(2) {
                    margin: 0;
                }
            }
        }

        .social-share-icons {
            a {
                svg {
                    width: 32px;
                    height: 32px;
                    transform: translateY(0.5px);
                }
            }
        }

        &__logo {
            background-size: cover;
            background-repeat: no-repeat;
            height: 32px;
            height: 3.2rem;
            width: 224px;
            width: 22.4rem;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-bottom: 1.5rem;

            img {
                height: 19px;
                height: 1.9rem;
                width: 213px;
                width: 21.3rem;
                max-width: 152%;

                @include respond-from(small) {
                    height: 22px;
                    height: 2.2rem;
                    width: 246px;
                    width: 24.6rem;
                }

                @include respond-from(medium) {
                    height: 28px;
                    height: 2.8rem;
                    width: 320px;
                    width: 32rem;
                }
            }
        }

        &__navigation {
            padding: 0;
            margin: 0;
            list-style: none;
            margin: 30px 0 20px;
            margin: 3rem 0 2rem;
            list-style-type: none;
            padding: 0;
            margin: 0;
            overflow: hidden;
            margin: 0 0 40px;
            margin: 0 0 4rem;
            display: flex;
            flex-direction: column;

            li {
                list-style: none;
                vertical-align: middle;
                margin: 0 !important;
                padding: 0 15px;
                padding: 0 1.5rem;
                text-align: center;

                a {
                    color: $color_1;
                    color: $color_1;
                    font-size: 1.7rem;
                    line-height: 2.2rem;

                    &:hover {
                        padding-bottom: 0 !important;
                        padding-bottom: 0 !important;
                    }
                }

                a.selected {
                    color: $color_2;
                }

                &:first-of-type {
                    padding: 0 0 1rem;
                }
            }

            li.current-page {
                a {
                    color: $color_2;
                }
            }

            >li {
                float: left;
                margin-right: 15px;
                margin-right: 1.5rem;

                &:last-child {
                    margin-right: 0;
                }

                a {
                    display: inline-block;
                    color: $color_3;
                }
            }
        }

        &__social {
            padding: 0;
            margin: 0;
            list-style: none;
            list-style-type: none;
            padding: 0;
            margin: 0;
            overflow: hidden;

            li {
                margin: 0;

                &:first-of-type {
                    margin: 0;
                    display: none;
                }

                a {
                    color: $color_2;

                    &:hover {
                        padding-bottom: 0 !important;
                        color: $color_2;
                    }
                }
            }

            >li {
                float: left;
                margin-right: 15px;
                margin-right: 1.5rem;

                &:last-child {
                    margin-right: 0;
                }

                a {
                    display: inline-block;
                    color: $color_3;
                }
            }
        }

        .footer-v3__container {
            margin: 0 auto;
            width: 100%;
            box-sizing: border-box;
            padding: 44px 0 18px;

            .social-share-icons {
                path.custom-social-v3 {
                    fill: #202020;
                }
            }
        }

        .footer-v3__container--top {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            margin-bottom: 30px;
        }

        .footer-v3__container--top--marsh {
            margin-bottom: 50px;
        }

        .footer-v3__container--top--marsh--logo {
            text-align: center;
            margin-bottom: 21px;
        }

        .footer-v3__container--top--marsh--logo--image {
            width: 246px;
            height: 20px;
            background-repeat: no-repeat;
            background-position: center;
            background-size: contain;
            display: inline-block;

            img {
                height: 20px;
                width: auto;
            }
        }

        .footer-v3__container--top--marsh--desc {
            margin: 0 auto;
            width: 100%;
            max-width: 370px;
            text-align: center;

            p {
                color: $color_2;
                font-size: 10px;
                line-height: 1.5;
                display: inline-block;
                font-weight: 700;
            }
        }

        .footer-v3__container--top--partners--list {
            display: flex;
            flex-direction: row;
            justify-content: center;
        }

        .footer-v3__container--top--partners--list--item {
            margin-right: 5px;

            &:last-child {
                margin-right: 0;
            }
        }

        .footer-v3__container--top--partners--list--item--link {
            img {
                height: 14px;
            }
        }

        .footer-v3__container--middle--social {
            margin-bottom: 24px;
            box-sizing: border-box;
            font-family: $font-family_2;
        }

        .footer-v3__container--middle--social--list {
            display: flex;
            justify-content: center;
            flex-direction: row;
        }

        .footer-v3__container--middle--links {
            margin: 0 auto;
            width: 100%;
            box-sizing: border-box;
            margin-bottom: 30px;
        }

        .footer-v3__container--middle--links--list {
            display: flex;
            flex-direction: row;
            justify-content: center;
            flex-wrap: wrap;
        }

        .footer-v3__container--middle--links--list--item {
            margin-right: 13px;
            margin-bottom: 20px;

            &:last-child {
                margin-right: 0;
            }

            a {
                font-size: 9px;
                color: $color_2;
                display: inline-block;
                text-transform: none;
            }
        }

        .footer-v3__container--bottom--list {
            display: flex;
            justify-content: center;
        }

        .footer-v3__container--bottom--list--item {
            text-align: center;

            a {
                font-size: 10px;
                color: $color_2;
                text-transform: none;

                &:hover {
                    color: $color_2  !important;
                }
            }

            span {
                font-size: 10px;
                color: $color_2;
                text-transform: none;

                &:hover {
                    color: $color_2  !important;
                }
            }
        }
    }

    @include respond-from(medium) {
        footer.site-footer--new {
            .footer-v3__container--top {
                flex-direction: row;
            }

            .footer-v3__container--top--marsh {
                width: 50%;
                max-width: 550px;
                margin-bottom: 0;
            }

            .footer-v3__container--top--marsh--logo {
                text-align: left;
            }

            .footer-v3__container--top--marsh--logo--image {
                width: 342px;
                height: 28px;

                img {
                    width: auto;
                    height: 28px;
                }
            }

            .footer-v3__container--top--marsh--desc {
                text-align: left;
                max-width: 100%;

                p {
                    font-size: 14px;
                }
            }

            .footer-v3__container--top--partners {
                max-width: 50%;
            }

            .footer-v3__container--top--partners--list {
                flex-wrap: wrap;
                justify-content: flex-end;
                padding-top: 10px;
            }

            .footer-v3__container--top--partners--list--item {
                margin-bottom: 10px;
            }

            .footer-v3__container--top--partners--list--item--link {
                img {
                    height: 19px;
                }
            }

            .footer-v3__container--middle {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 9px;
            }

            .footer-v3__container--middle--social {
                order: 2;
                width: 50%;
            }

            .footer-v3__container--middle--social--list {
                justify-content: flex-end;
            }

            .footer-v3__container--middle--links {
                order: 1;
                width: 50%;
                max-width: 856px;
                margin-bottom: 0;
            }

            .footer-v3__container--middle--links--list {
                justify-content: space-between;

                &::after {
                    content: "";
                    flex: auto;
                }
            }

            .footer-v3__container--middle--links--list--item {
                margin-bottom: 15px;
                margin-right: 25px;

                a {
                    font-size: 14px;
                }
            }

            .footer-v3__container--bottom--list {
                justify-content: flex-start;
            }

            .footer-v3__container--bottom--list--item {
                text-align: left;

                a {
                    font-size: 13px;
                }

                span {
                    font-size: 13px;
                }
            }
        }
    }

    @include respond-to(medium) {
        .site-footer--new__social.social {
            text-align: center;
            margin: 5px auto 25px;
            margin: .5rem auto 2.5rem;

            a {
                color: $color_2;
                font-size: 32px;
                font-size: 3.2rem;
            }
        }
    }

    @include respond-from(small) {
        footer.site-footer--new {
            .footer-v3__container--top--partners--list--item {
                margin-right: 15px;
            }
        }
    }

    @include respond-from(large) {
        footer.site-footer--new {
            .footer-v3__container--middle--social {
                width: 33%;
            }

            .footer-v3__container--middle--links {
                width: 66%;
                margin: 0;
            }
        }
    }
`;

const DOC = `
/** mmc-footer.component.html **/

${HTMLSOURCE}

/** end of html code **/

/** mmc-footer.component.scss **/

${SCSSSOURCE}

/** end of scss code **/

`;



const Mock: Story = (args) => ({
  props: { ...args },
  template: TEMPLATE,
});

export const MMCFooter = Mock.bind({});

MMCFooter.parameters = {
  docs: {
    description: {
        story: 'Some story **markdown**',
    },
    source: {
      code: DOC,
    },
  },
};

