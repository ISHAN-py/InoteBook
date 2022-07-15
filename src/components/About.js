import React from 'react';

export default function About(props) {
    let myStyle = {
        color: props.mode === 'dark'?'white':'black',
        backgroundColor: props.mode ==='dark'?'rgb(70, 69, 69)':'white'
    }
    return (
        <>
        <div className="container" style={myStyle}>
            <h1 className="my3">About Us</h1>
            <div class="accordion" id="accordionExample" style={myStyle}>
                <div class="accordion-item" style={myStyle}>
                    <h2 class="accordion-header" id="headingOne" >
                        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne" style={myStyle}>
                            Analyze your Text
                        </button>
                    </h2>
                    <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                        <div class="accordion-body" style={myStyle}>
                            There are different ways in which you can analyze your text using the TextUtils website the different options are copy lower case uppercase compress etc! Lorem ipsum, dolor sit amet consectetur adipisicing elit. Labore, suscipit.
                        </div>
                    </div>
                </div>
                <div class="accordion-item" style={myStyle}>
                    <h2 class="accordion-header" id="headingTwo" >
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo" style={myStyle}>
                            Free To Use 
                        </button>
                    </h2>
                    <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample" >
                        <div class="accordion-body" style={myStyle}>
                            textUtlis is a free to use text utility that can be very useful in day to day tasks. TextUtils is completely Free to Use! Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab, nostrum!
                        </div>
                    </div>
                </div>
                <div class="accordion-item" style={myStyle}>
                    <h2 class="accordion-header" id="headingThree">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree"  style={myStyle}>
                            Browser Compatibility 
                        </button>
                    </h2>
                    <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample" style={myStyle}>
                        <div class="accordion-body" style={myStyle}>
                            TextUtils is compatible in all the modern browsers including chrome firefox safari edge etc! Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptas, sapiente?
                        </div>
                    </div>
                </div>
                <div class="accordion-item" style={myStyle}>
                    <h2 class="accordion-header" id="headingThree">
                        <button class="accordion-button collapsed " type="button" data-bs-toggle="collapse" data-bs-target="#four" aria-expanded="false" aria-controls="four"  style={myStyle}>
                            Made with ❤️ By Ishan
                        </button>
                    </h2>
                </div>
            </div>
            </div>
        </>
    )
}