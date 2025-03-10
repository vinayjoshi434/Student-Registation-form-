document.addEventListener("DOMContentLoaded", () => {

    //const btn = document.getElementById("register")
    //console.log(btn.target)
    const formfeild = document.getElementById("forminput")
    const namefeild = document.getElementById("nameinput")
    const emailfeild = document.getElementById("emailinput")
    const Addressfeild = document.getElementById("Addressinput")
    const coursefeild = document.getElementById("courseinput")


    const tablebody = document.querySelector(".table-body")




    const tablediv = document.getElementById("table-cont")
    const tablecont = document.getElementById("student-table")



    function Store() {
        localStorage.setItem("list", JSON.stringify(list))
    };

    let list = JSON.parse(localStorage.getItem("list")) || [];


    // let selectedvalue = null;

    function handelsubmit(e) {
        e.preventDefault()
        // console.log("clicked")
        const genderfeild = document.querySelector('input[name="gender"]:checked')

        const student = {
            id: Date.now(),
            name: namefeild.value.trim(),
            email: emailfeild.value.trim(),
            address: Addressfeild.value.trim(),
            course: coursefeild.value.trim(),
            gender: genderfeild.value
        }

        list.push(student)
        Store()
        // console.log(list)
        formfeild.reset()
        Render(student)
    }



    formfeild.addEventListener("submit", handelsubmit)



    // here i just wnat to use js table liberary to present data;
    // let table = new Tabulator("#table-cont", {
    //     data: list,
    //     layout: "fitColumns",
    //     columns: [

    //         { title: "Name", field: "name", sorter: "string", },
    //         { title: "Email", field: "email" },
    //         { title: "Course", field: "course" }
    //     ]
    // });
    // let table = new DataTable("#table-cont");



    list.map((studentobj) => {
        Render(studentobj)
    })


    function Render(studentobj) {
        const trow = document.createElement("tr")


        let keyarray = Object.keys(studentobj)
        console.log(keyarray)
        keyarray.map((ele) => {
            const Td = document.createElement("td")
            Td.textContent = studentobj[ele]
            trow.appendChild(Td)
        })

        const controltd = document.createElement("td")

        const editbtn = document.createElement("button")
        const editimg = document.createElement("img")
        editimg.src = "https://img.icons8.com/?size=100&id=111452&format=png&color=000000"
        editimg.classList.add("w-6")
        editbtn.appendChild(editimg)

        const removebtn = document.createElement("button")
        const rmvimg = document.createElement("img")
        rmvimg.src = "https://img.icons8.com/?size=100&id=78581&format=png&color=000000"
        rmvimg.classList.add("w-6", "ml-2")
        removebtn.appendChild(rmvimg)

        controltd.appendChild(editbtn)
        controltd.appendChild(removebtn)
        trow.appendChild(controltd)
        tablebody.appendChild(trow)


        editbtn.addEventListener("click", () => {
            handeledit(studentobj.id)
        })

        removebtn.addEventListener("click", () => {
            remove(studentobj.id)
        })
    }


    function handeledit(id) {

        let findedindex = list.findIndex((student) => {
            return student.id === id
        })

        const findedstudent = list[findedindex]
        console.log(findedstudent)

        // populating the form feild with old data
        namefeild.value = findedstudent.name
        emailfeild.value = findedstudent.email
        Addressfeild.value = findedstudent.address
        coursefeild.value = findedstudent.course

        formfeild.querySelector("button[type='submit']").textContent = "Update"

        formfeild.querySelector("button[type='submit']").classList.add("btn", "btn-info")



        formfeild.removeEventListener("submit", handelsubmit)


        // //here this form feild event listner is only for updating the record we change the nature of general submit event
        formfeild.addEventListener("submit", function updatesubmit(e) {

            e.preventDefault()
            const genderfeild = document.querySelector('input[name="gender"]:checked')
            //     // updating the value of findedobject with the new values that will enter in form feild



            findedstudent.id = id
            findedstudent.name = namefeild.value.trim()
            findedstudent.email = emailfeild.value.trim()
            findedstudent.address = Addressfeild.value.trim()
            findedstudent.course = coursefeild.value.trim()
            findedstudent.gender = genderfeild.value.trim()



            Store()

            list[findedindex] = findedstudent
            tablebody.innerHTML = ""
            list.map((studentobj) => {
                Render(studentobj)
            })


            formfeild.querySelector("button[type='submit']").innerHTML = '<img src="https://img.icons8.com/?size=100&id=61050&format=png&color=000000" alt="">'
            formfeild.querySelector("button[type='submit']").firstChild.classList.add("w-10")

            //         restore the orignal event listner
            formfeild.removeEventListener("submit", updatesubmit)
            formfeild.addEventListener("submit", handelsubmit)
            formfeild.reset()

        })



    }

    function remove(id) {
        list = list.filter((ele) => {
            return ele.id !== id
        })


        tablebody.innerHTML = ""
        list.map((studentobj) => {
            Render(studentobj)
        })
        Store()
    }




















}
)