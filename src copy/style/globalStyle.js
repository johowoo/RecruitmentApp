import {injectGlobal} from 'styled-components';

injectGlobal`
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
	font-family: "Microsoft YaHei";
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
	line-height: 1;
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}
//common styles
.sign-title{
text-align: center;
font-family: "Microsoft YaHei";
color: #454545;
margin-bottom: 20px;
font-size: 3.5vh;
}
.am-list-item .am-input-label,
.am-textarea-label,
 .am-list-item .am-list-line .am-list-content{
color:#787878 !important;
font-size: 13px !important;
}
body{
background-color: rgba(200,200,200,.1);
}
.icon {
   width: 1em; height: 1em;
   vertical-align: -0.15em;
   fill: currentColor;
   overflow: hidden;
}
.icon-avatar{
width:3em;
height: 3em;
box-sizing: border-box;
padding-right: 2vw;
overflow: hidden;
}
.icon-avatar.active{
width:1em;
height: 1em;
box-sizing: border-box;
//padding-right: 2vw;
//overflow: hidden;
}
.fixed-header{
position: fixed;
top:0;
width: 100%;
z-index: 100;
}
.icon-avatar-big{
width:4.2em;
height:4.2em;
}
.icon-avatar-small{
width:3.2em;
height:3.2em;
}

.fixed-top-bar{
position: fixed;
top:0;
width: 100%;
z-index: 100;
}

//chat component
#chat-page .am-list-extra{
	flex-basis:auto;
}
.stick-footer{
	z-index:10;
	position:fixed;
	bottom: 0px;
	width:100%;
}
.am-list-body::before,
.am-list-body::after{
//border:1px solid transparent !important;
background-color: #efefef !important;
}
#chat-page .chat-to-me{
max-height: 51px;
}
#chat-page .chat-to-me .am-list-content{
//height: 45px;
	padding-right: 8px ;
	box-sizing: border-box;
	text-align: right ;

}
#chat-page .am-grid-icon{
	display: none;
}
#chat-page .am-grid-text{
	margin-top: 0;
}
`