import styled from'styled-components';
export const AvatarWrapper=styled.div`
height:38vh;
background-color:#efefef;
.am-list-header,
.am-list{
padding-top: 0;
padding-bottom: 0;
line-height: 8vh;
height: 8vh;
color:#666;
font-size: 14px;
&::after{
clear: both;
content:'';
display: block;
}
}

`

export const ChosenAvatarContainer=styled.div`
p{
float:left;
}
`


export const ChosenAvatar=styled.div`
float:left;
border-radius: 50%;
svg{
float:left !important;
height: 8vh !important;
width: 8vh !important;
padding-left: 1vh;
}
`
export const ImgContainer=styled.div`
box-sizing: border-box;
width:25%;
border:1px solid #eee;
height:10vh;
line-height: 15vh;
padding: 1vw 0;
text-align: center;
box-shadow: 0 0 1px 0 rgba(0,0,0,.1);
float:left;
img{
width: 60%;
text-align: center;
}
`