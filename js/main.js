let allSections = document.querySelectorAll(".section");
let activeStepNum = document.querySelectorAll("nav .num");
let inputs = document.querySelectorAll(".input input");
let prName = document.getElementById("name");
let prEmail = document.getElementById("email");
let prphone = document.getElementById("phone");
let divInputs = document.querySelectorAll(".input");
let labels = document.querySelectorAll(".input label.title");
let allButtonsContainer = document.querySelectorAll(".buttons-container")
let AllNextStep = document.querySelectorAll(".next-step");
//Active step number function
function changeActiveNumber() {
  for (let i = 0; i < activeStepNum.length; i++) {
    if (allSections[i].classList.contains("active")) {
      activeStepNum.forEach((num) => {
        num.classList.remove("active");
      });
      activeStepNum[i].classList.add("active");
    }
  }
}
changeActiveNumber();
//All next step default operations function
allStyles = getComputedStyle(document.documentElement);
document.documentElement.style.setProperty("--maxWidthResponsive",`${screen.width+1}px`)
document.documentElement.style.setProperty("--maxSectionWidthResponsive",`${screen.width - 40}px`)
console.log(allStyles.getPropertyValue("--maxSectionWidthResponsive"))
console.log(allStyles.getPropertyValue("--maxWidthResponsive"))
let SectionTransitionDuration = allStyles.getPropertyValue(
  "--sectionTransitionDuration"
);
let container = document.querySelector(".container")
let containerRec = container.getBoundingClientRect()
function defaultNextStep() {
  for (let i = 0; i < allSections.length; i++) {
    if (allSections[i].classList.contains("active")) {
      allSections[i].classList.remove("active");
      allSections[i].style.cssText += "animation-play-state:running;";
      allSections[i + 1].classList.add("active");
      setTimeout(() => {
        allSections[i].style.cssText = "display:none;";
        allSections[i + 1].style.display = "block";
       
      }, parseInt(SectionTransitionDuration) * 1000);
      break;
    }
  }
  changeActiveNumber();
}
console.log(SectionTransitionDuration);

//Add default operations function to all nex step

//Label animations

for (let i = 0; i < inputs.length; i++) {
  inputs[i].onfocus = function () {
    if (inputs[i].getAttribute("id") === "phone") {
      labels[i].style.cssText +=
        "left:0px;top:-25px;transition-duration:0.2s;color:var(--marineBlue)";
      inputs[i].setAttribute("placeholder", "e.g +1 234 567 890");
    } else {
      labels[i].style.cssText +=
        "left:0px;top:-25px;transition-duration:0.2s;color:var(--marineBlue)";
    }
  };
}

for (let i = 0; i < inputs.length; i++) {
  inputs[i].onblur = function () {
    if (inputs[i].value === "") {
      if (inputs[i].getAttribute("id") === "phone") {
        labels[i].style.cssText += "left:20px;top:12px;color:var(--Coolgray)";
        inputs[i].removeAttribute("placeholder");
      } else {
        labels[i].style.cssText += "left:20px;top:12px;color:var(--Coolgray)";
      }
    }
  };
}

class person {
  constructor(name, email, phone) {
    this.name = name;
    this.email = email;
    this.phone = phone;
  }
}

// let infoNextStep = document.querySelector("#infos .next-step");
let register;
AllNextStep[0].onclick = function () {
  for (let i = 0; i < divInputs.length; i++) {
    if (inputs[i].value === "") {
      inputs[i].classList.add("empty");
      let reqError = document.createElement("label");
      reqError.textContent = "this field is requierd";
      reqError.classList.add("error");
      divInputs[i].appendChild(reqError);
      return `stop`;
    }
  }
  register = new person(prName.value, prEmail.value, prphone.value);
  defaultNextStep();
};


//Second Section

//plan selection
let plans = document.querySelectorAll(".plan-type");
let yearBonus = document.querySelectorAll(
  ".plan-type .text-content .year-bonus"
);
let yearBonusText = "2 months free";
let planPrices = document.querySelectorAll(".plan-price");
let planPeriods = document.querySelectorAll(".period");
let monthly = document.getElementById("monthly");
let yearly = document.getElementById("yearly");
let PeriodSelectIcon = document.querySelector(".period-selection .ball");
let monthlyPeriod = "mo";
let yearlyPeriod = "yr";
let paymentPeriod = "monthly";
let plansObject = {
  arcade: {
    monthlyPrice: 9,
    yearlyPrice: 90,
  },

  advanced: {
    monthlyPrice: 12,
    yearlyPrice: 120,
  },

  pro: {
    monthlyPrice: 15,
    yearlyPrice: 150,
  },
};

for (let i = 0; i < planPrices.length; i++) {
  let plansArray = Object.keys(plansObject);
  planPrices[i].textContent = `$${
    plansObject[plansArray[i]].monthlyPrice
  }/${monthlyPeriod}`;
}

//plan selection

plans.forEach((plan) => {
  plan.onclick = function () {
    for (let i = 0; i < plans.length; i++) {
      if (plans[i].classList.contains("selected")) {
        plans[i].classList.remove("selected");
      }
    }
    plan.classList.add("selected");
  };
});

//period selection


planPeriods.forEach((period) => {
  if (period.getAttribute("id") === "monthly") {
    paymentPeriod = "monthly";
    yearBonus.forEach((bonus) => {
      bonus.style.display = "none";
    });
    //change icon
    PeriodSelectIcon.style.cssText += "left:3px;right:unset";

    //change payment period

    for (let i = 0; i < planPrices.length; i++) {
      let plansArray = Object.keys(plansObject);
      planPrices[i].textContent = `$${
        plansObject[plansArray[i]].monthlyPrice
      }/mo`;
    }
  } else {
    paymentPeriod = "yearly";
    //Add yearly bonus
    yearBonus.forEach((bonus) => {
      bonus.style.display = "block";
      bonus.textContent = yearBonusText;
    });

    // change icon
    PeriodSelectIcon.style.cssText += "right:3px;left:unset";
    //change payment period

    for (let i = 0; i < planPrices.length; i++) {
      let plansArray = Object.keys(plansObject);
      planPrices[i].textContent = `$${
        plansObject[plansArray[i]].yearlyPrice
      }/yr`;
    }
  }
  period.onclick = function () {
    //remove selected class from all
    for (let i = 0; i < planPeriods.length; i++) {
      planPeriods[i].classList.remove("selected");
    }
    //add selected class
    period.classList.add("selected");
    if (period.getAttribute("id") === "monthly") {
      paymentPeriod = "monthly";
      yearBonus.forEach((bonus) => {
        bonus.style.display = "none";
      });
      //change icon
      PeriodSelectIcon.style.cssText += "left:3px;right:unset";

      //change payment period

      for (let i = 0; i < planPrices.length; i++) {
        let plansArray = Object.keys(plansObject);
        planPrices[i].textContent = `$${
          plansObject[plansArray[i]].monthlyPrice
        }/mo`;
      }
    } else {
      paymentPeriod = "yearly";
      //Add yearly bonus
      yearBonus.forEach((bonus) => {
        bonus.style.display = "block";
        bonus.textContent = yearBonusText;
      });

      // change icon
      PeriodSelectIcon.style.cssText += "right:3px;left:unset";
      //change payment period

      for (let i = 0; i < planPrices.length; i++) {
        let plansArray = Object.keys(plansObject);
        planPrices[i].textContent = `$${
          plansObject[plansArray[i]].yearlyPrice
        }/yr`;
      }
    }
  };
});

// let planNextStep = document.querySelector("#plan .next-step");
AllNextStep[1].onclick = function () {
  let selectedPlan;
  plans.forEach((plan) => {
    if (plan.classList.contains("selected")) {
      selectedPlan = plan;
      register.plan = {
        name: selectedPlan.getAttribute("id"),
        period: paymentPeriod,
        price:
          plansObject[selectedPlan.getAttribute("id")][`${paymentPeriod}Price`],
      };
    }
  });

  //add prices

  for (let i = 0; i < addsPrice.length; i++) {
    let addsarray = Object.keys(addsObject);
    if (paymentPeriod === "monthly") {
      addsPrice[i].textContent = `+$${
        addsObject[addsarray[i]].monthlyPrice
      }/mo`;
    } else {
      addsPrice[i].textContent = `+$${addsObject[addsarray[i]].yearlyPrice}/yr`;
    }
  }

  //final plan
  plans.forEach((plan) => {
    if (plan.classList.contains("selected")) {
      finalPlan.textContent = `${plan.getAttribute("id")} (${paymentPeriod})`;
      if (paymentPeriod === "monthly") {
        finalPlanPrice.textContent = `$${
          plansObject[plan.getAttribute("id")].monthlyPrice
        }/mo`;
        totalPrice += plansObject[plan.getAttribute("id")].monthlyPrice;
      } else {
        finalPlanPrice.textContent = `$${
          plansObject[plan.getAttribute("id")].yearlyPrice
        }/yr`;
        totalPrice += plansObject[plan.getAttribute("id")].yearlyPrice;
      }
    }
  });

  defaultNextStep();
};

//end of plans

//Pic Add-ons

let adds = document.querySelectorAll(".adds .add");
let checkBoxes = document.querySelectorAll(".add .checkbox");
let addsPrice = document.querySelectorAll(".add .add-price");
let addNextStep = document.querySelector("#add-ons .next-step");

let addsObject = {
  onlineService: {
    name: "online service",
    monthlyPrice: 1,
    yearlyPrice: 10,
  },
  largerStorage: {
    name: "larger storage",
    monthlyPrice: 2,
    yearlyPrice: 20,
  },
  customizedProfile: {
    name: "customized profile",
    monthlyPrice: 2,
    yearlyPrice: 20,
  },
};

//add selection
for (let i = 0; i < adds.length; i++) {
  adds[i].onclick = function () {
    if (adds[i].classList.contains("selected")) {
      adds[i].classList.remove("selected");
      checkBoxes[i].classList.remove("selected");
    } else {
      adds[i].classList.add("selected");
      checkBoxes[i].classList.add("selected");
    }
  };
}

//Create addOns bills
let finlAddsBill = document.querySelector(".addOns-bill");

//Summary Section
// plan object name : plansObject
// plan add-ons name : addsObject
let totalPrice = 0;
let finalPlan = document.querySelector(".bills .selected-plan");
let finalPlanPrice = document.querySelector(".bills .plan-bill-price");
let addBills;


//Total bill
let totalCost = document.querySelector(".total-cost");
let totalCostText = document.querySelector(".total-cost .total-text");
let totalCostPrice = document.querySelector(".total-cost .total-price");

let confirmButton = document.querySelector(".confirm");
let completeSection = document.getElementById("complete");


let selectedAddsArray = [];
let totalAddsPrice = 0;
AllNextStep[2].onclick = function () {
  selectedAddsArray=[];
  for (let i = 0; i < adds.length; i++) {
    if (adds[i].classList.contains("selected")) {
      selectedAddsArray.push(adds[i].getAttribute("id"));
    }
  }
   totalAddsPrice = 0;
  for (let i = 0; i < selectedAddsArray.length; i++) {
    totalAddsPrice += addsObject[selectedAddsArray[i]][`${paymentPeriod}Price`];
  }
  register.addOns = {
    names: selectedAddsArray,
    price: totalAddsPrice,
  };
  register.totalPrice = register.plan.price + register.addOns.price;

  adds.forEach((add) => {
    if (add.classList.contains("selected")) {
          let addBill = document.createElement("div");
       addBill.classList.add("add-bill");
       let addBillText = document.createElement("span");
        addBillText.classList.add("add-bill-text");
      addBillText.textContent = addsObject[add.getAttribute("id")].name;
      let addBillPrice = document.createElement("span");
      addBillPrice.classList.add("add-bill-price");
      addBillPrice.classList.add("cost");
      if (paymentPeriod === "monthly") {
        addBillPrice.textContent = `+$${
          addsObject[add.getAttribute("id")].monthlyPrice
        }/mo`;
        totalPrice += addsObject[add.getAttribute("id")].monthlyPrice;
      } else {
        addBillPrice.textContent = `+$${
          addsObject[add.getAttribute("id")].yearlyPrice
        }/yr`;
        totalPrice += addsObject[add.getAttribute("id")].yearlyPrice;
      }
      addBill.appendChild(addBillText);
      addBill.appendChild(addBillPrice);
      finlAddsBill.appendChild(addBill);
      addBills = document.querySelectorAll(".add-bill");
        
    }
  });
  if (paymentPeriod === "monthly") {
    totalCostText.textContent = "Total (per month)";
    totalCostPrice.textContent = `$${register.totalPrice}/mo`;
  } else {
    totalCostText.textContent = "Total (per year)";
    totalCostPrice.textContent = `$${register.totalPrice}/yr`;
  }
  defaultNextStep();
};


confirmButton.onclick = function () {
  defaultNextStep();
};

//Go Back button
for(let i=0;i < allSections.length ; i++){
  if(i < allSections.length-1 && i !== 0){
    let goBackButton = document.createElement("span")
    goBackButton.className = "go-back"
    goBackButton.textContent = "Go Back"   
    allButtonsContainer[i].appendChild(goBackButton)
    allButtonsContainer[i].style.justifyContent = "space-between"
  }
}

let goBack = document.querySelectorAll(".go-back")

goBack.forEach((button) => {
  button.onclick = function(){
    for(let i=0 ; i < allSections.length ; i++){
        if(allSections[i].classList.contains("active")){
          allSections[i].classList.remove("active")
          allSections[i].style.display = "none"
          allSections[i-1].classList.add("active")
          allSections[i-1].style.cssText = "animation-direction:backwards;display:block;"
          
          
          activeStepNum.forEach((num) => {
            num.classList.remove("active");
          });
          activeStepNum[i-1].classList.add("active")
          if(i > 1 ){
            
              addBills.forEach((bill) => {
                bill.remove()
              })
            
          }
        }
    }
  }
})

// let buttonContainerRec = allButtonsContainer[0].getBoundingClientRect();
// console.log(buttonContainerRec)

let headElement = document.head
if(outerWidth <= 600){
  let mobileCss = document.createElement("link")  
  mobileCss.textContent = `
    .form{
        background-color: var(--Magnolia);
        padding: 0;
        .section-details {
            margin-bottom: 40px;
            .section-title{
                margin: 10px 0px;
                margin-top: 0;
                font-size: 25px;
            }
        }
        .container{
            flex-direction: column;
    min-width: 100%;
    background-color: var(--Magnolia);
    padding: 0;
    border-radius: 0;
    gap: 0;
    left: 0;
    top: 0;
    position: relative;
    transform: none;
    height: 100%;

    .steps{
    flex-direction:row;
    height: 150px;
    background-position: bottom;
    width: 100%;
    background-size: cover;
    border-radius: 0;
    justify-content: center;
    z-index: 0;
    align-items: flex-start;
        .step .text-content{
            display: none;
        }
    } 
        
        }
        .section{
                max-width: ${outerWidth - 40}px ;
                background-color: var(--White);
                margin: -60px auto;
                z-index: 1;
                padding: 40px 20px;
                padding-top: 20px;
                border-radius: 10px;

                .buttons-container{
                    padding: 20px;
                    bottom: 0;
                    transform: translateY(100% + 20px);
                    right: 0px;
                    background-color: var(--White);
                    
                    
                }

                .next-step{
                    bottom: -20px;
                    border-radius: 5px;
                }
                
                .go-back{
                    bottom: -20px;
                    padding: 12px 20px;
                }

            }

            #plan{
                .plans-types{
                    flex-direction: column;
                    gap: 15px;
                    .plan-type{
                        flex-direction: row;
                           width: 100%;
                           padding: 15px;
                    }
                }
            }

            #add-ons{
                .adds{
                     .add{
                        width: 100%;
                        padding: 10px 15px; .add-prive{
                            font-size: 14px;
                        }
                        .service .text-content{
                            h4{
                                font-size: 15px;
                            }
                            
                            p{
                                font-size: 14px;

                            }
                        } 
                            
                            
                     }
                }
            }

            #summary .bills{
                width: 100%;
            }

            #complete{
                min-width: auto;
                .finishing-up{
                    width: auto;
                position: static;
                transform: none;
                }
                
            }
    }      
`
  mobileCss.href = `css/mentor2Mobile.css`;
  mobileCss.rel = `stylesheet`;
  headElement.append(mobileCss)
  document.documentElement.style.setProperty("--sectionMobileWidth",`${outerWidth-40}px`)
}

let changeButton = document.querySelector(".change-plan")
let planSection = document.getElementById("plan")
console.log(SectionTransitionDuration)
changeButton.onclick = function(){
  allSections.forEach((section) => {
    section.classList.remove("active")
      section.style.display = "none"
      planSection.classList.add("active")
      planSection.style.cssText += "display:block;"
      planSection.style.cssText +=`logInSection var(--sectionTransitionDuration) forwards ease-out,logOutSection var(--sectionTransitionDuration) forwards ease-out paused;`
      activeStepNum.forEach((num) => {
        num.classList.remove("active")
      })
    
  })
  activeStepNum[1].classList.add("active")
  addBills.forEach((bill) => {
    bill.remove()
  })
}


  

