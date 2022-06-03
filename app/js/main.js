import '../css/main.scss'
import Cropper from 'cropperjs';
// import '../js/details.json'
// const fs = require("fs")

// const fs = require("fs")
const AppView = () => {


    // grab DOM elements inside index.html
    const fileSelector = document.getElementById( "fileSelector" );
    const editorCanvas = document.getElementById( "editorCanvas" );
    let dled = document.querySelector('.dled')
    let dled1 = document.querySelector('.dled1')
    let dled2 = document.querySelector('.dled2')
    let care = document.querySelector('.care')
    let prev = document.querySelector('.prev')
    let imgwidth= 500;

    
    fileSelector.onchange = function( e ) {
        // get all selected Files
        prev.style.display = "none"
        const files = e.target.files;
        let file;
        for ( let i = 0; i < files.length; ++i ) {
            file = files[ i ];
            // check if file is valid Image (just a MIME check)
            switch ( file.type ) {
                case "image/jpeg":
                case "image/png":
                case "image/gif":
                    // read Image contents from file
                    const reader = new FileReader();
                    reader.onload = function( e ) {
                        // console.log(reader.result)
                        localStorage.setItem('recent-image', reader.result)
                        // create HTMLImageElement holding image data
                        const img = new Image();
                        img.src = reader.result;

                        img.onload = function() {
                            // grab some data from the image
                            const width = img.naturalWidth;
                            const height = img.naturalHeight;
                            // let load = document.getElementById('load')
                            // let json = document.getElementById('json')
                            editorCanvas.width = 500;
                            editorCanvas.height = 500 * height / width;
                            const ctx = editorCanvas.getContext('2d');
                            ctx.drawImage(img, 0, 0, width, height, 0, 0, editorCanvas.width, editorCanvas.height);
                            care.style.display = "none"
                            editorCanvas.style.display = "block"
                            load.style.display = "none"
                            dled1.style.display = "block"
                            dled.style.display = "block"
                            dled2.style.display = "block"
                            let zin = document.getElementById('zin')
                            let zout = document.getElementById('zout')
                          
                         
                            zin.addEventListener("click", ()=>{
                                zout.disabled = false
                                editorCanvas.classList.remove('image-close')
                                editorCanvas.classList.add("image-open");
                                zin.disabled = true
                                 imgwidth = 1000
                            })
                            zout.addEventListener("click", ()=>{
                                zin.disabled = false
                                editorCanvas.classList.remove("image-open")
                                editorCanvas.classList.add("image-close");
                                zout.disabled = true
                                 imgwidth = 250
                            })
                            
                            
                        }
                        
                    };
                    
                    reader.readAsDataURL( file, imgwidth );
                    let submit = document.getElementById('submit')
                    submit.addEventListener("click",()=>{
                        let data = {
                            "canvas": {
                                "width": 500,
                                "height": 10,
                                "photo" : {
                                    "id": "User Uploaded Photo",
                                    "width": `${imgwidth}`,
                                    "x": 0,
                                    "y": 0
                                }
                            }
                        }
                        // JSON.stringify(data)
                        // console.log(data)
                        localStorage.setItem('detailsjson', JSON.stringify(data))
                        let status = document.querySelector('.status')
                        status.innerHTML = "Your Image and Canvas details has been succesfully submitted"
                        status.style.color = "green"
                    })
                    
                                        
            }
        }
    };
    let load = document.getElementById('load')
    load.addEventListener("click", ()=>{
      const recentImageDataUrl = localStorage.getItem('recent-image')
      if (recentImageDataUrl) {
        care.style.display = "none"
         let preview = document.getElementById('preview')
         preview.setAttribute("src", recentImageDataUrl)
         prev.style.display = "block"
         let jsondata = localStorage.getItem('detailsjson')
         let parseddata = JSON.parse(jsondata)
        //  console.log(parseddata.canvas.photo.width)

        let genwidth = parseddata.canvas.photo.width
        if (genwidth == 500) {
            genwidth = 508
        }
        if (genwidth == 1000) {
            genwidth = 1008
        }
        if (genwidth == 250) {
            genwidth = 258
        }
        preview.style.width = parseddata.canvas.photo.width + 'px'
        prev.style.width = genwidth + 'px'

      }  
      else{
          alert("Store An Image first")
      }
    })
}

AppView();

