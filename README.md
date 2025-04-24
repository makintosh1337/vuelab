@import "fonts.css";

.service ul li::before {
    content: "\2714";
}

.service ul li:hover::before {
    color: #b9b9b9;
}

input[type="number"] {
    position: relative;
}

input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
    opacity: 1;
}

input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
}

*{
    margin: 0;
    padding: 0;
    border: none;
    box-sizing: border-box;
}
.header-wrapper{
    display: flex;
    height: 100px;
    justify-content: space-around;
    background-color: rgba(0, 0, 0, 0.7);
}

.logo-wrapper{
    display: flex;
}

a{
    text-decoration: none;
    color: #fff;
}
nav a{
    font-weight: bold;
    text-align: center;
    font-size: 20px;
}
nav{
    width: 750px;
    display: flex;
    justify-content: space-around;
    align-items: center;

}
.logo-wrapper h1{
    font-weight: 300;
    margin: auto;
    margin-left: 20px;
    text-align: center;
}

header{
    width: 100%;
    height: 800px;
    background-image: url(../img/header_bg.jpg);
    background-repeat: no-repeat;
    backdrop-filter: blur(100px);
    background-size: auto;
}

.slogan{
    height: 80%;
    display: flex;
    align-items: center;
}
.slogan p{
    font-size: 100px;
    font-weight: bold;
    width: 90%;
    margin: auto;
    color: #fff;
    text-align: center;
}
#about{
    background-color: black;
}
#about h2{
    color: #fff;
    font-size: 64px;
    text-align: center;
    padding-top: 50px;
}
.advantages h3, p{
    color: #fff;

}
.advantage{
    width: 45%;
}
.advantages{
    display: flex;
    flex-wrap: wrap;
    width: 90%;
    margin: auto;
    gap: 40px;
    margin-top: 50px;
    justify-content: center;
    padding-bottom: 60px;
}
.advantage h3{
    font-weight: bold;
    font-size: 32px;
    margin-bottom: 10px;
}
.advantage p{
    width: 70%;
    font-size: 24px;
}
.empty  {
    width: 45%;
    height: 100px;
    border-radius: 60px;
}

.empty:nth-of-type(1) {
    background: linear-gradient(to right, #ffffff, #000000);
}

.empty:nth-of-type(2) {
    background: linear-gradient(to left, #ffffff, #000000);
}

.empty:nth-of-type(3) {
    background: linear-gradient(to right, #ffffff, #000000);
}



#services {
    padding: 25px 20px 0 20px;
}

#services h2 {
    font-size: 48px;
    text-align: center;
    margin-bottom: 40px;
    color: #000;
}

.services {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: center;
    gap: 85px;
    padding: 30px;
    max-width: 759px;
    margin: 0 auto;
}

.service {
    margin-bottom: 30px;
}

.service h3 {
    font-size: 24px;
    margin-bottom: 10px;
    color: #000;
}

.service ul {
    list-style: none;
    padding: 0;
}

.service ul li {
    position: relative;
    padding-left: 30px;
    margin-bottom: 10px;
    font-size: 18px;
    color: #000;
}

.service ul li::before {
    content: "\2714";
    position: absolute;
    left: 0;
    color: #000;
    font-size: 18px;
}

#photo_gallery {
    background-color: black;
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 20px;
    padding: 0 0 45px 0;
}

#photo_gallery h2 {
    margin-top: 20px;
    font-size: 48px;
    color: white;
}

.photo img {
    object-fit: cover;
    width: 500px;
    height: 350px;
}

.photos {
    width: 1500px;
    display: flex;
    flex-wrap: wrap;

}



