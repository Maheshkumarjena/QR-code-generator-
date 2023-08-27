let Input = document.getElementById("inpt");
let QRbox = document.getElementsByClassName("qr");
QRbox = QRbox[0];
let qrImage = document.getElementById("qrImage");
let button = document.getElementById("button");
console.log(QRbox);
var footer= document.getElementById('ftr');
var qr=document.getElementById('qr');


button.addEventListener("click", () => {



function generateQRCode() {
    return new Promise((resolve, reject) => {
        let srcMain = Input.value; // Assuming Input is already defined


        if (!srcMain) {
            footer.innerHTML="Please enter your text or URL to generate QR code";
                qr.style.display="none";
            reject(new Error("Input value is missing."));
            return;
        }

        let qrImage = new Image();
        qrImage.onload = () => {
            resolve(qrImage);
        };
        qrImage.onerror = (error) => {
            reject(error);
        };
        qrImage.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=Example=${srcMain}`;
    });
}

generateQRCode()
    .then((qrImage) => {
        let QR = document.getElementById("qr");
         
        // Remove any existing QR image before appending the new one
        let existingQRImage = QR.querySelector("img");
        if (existingQRImage) {
            QR.removeChild(existingQRImage);
        }
        let qrContainer = document.getElementById("qr");

        qrContainer.classList.add("active");


        qr.style.display='block'
        QR.classList.remove("qr");
        QR.appendChild(qrImage); // Append the generated QR image to the element with ID "qr"
        footer.innerHTML = `Your QR Code for "${Input.value}" has been successfully generated..`;

    })
    .catch((error) => {
        console.error("An error occurred:", error);
    });



});
