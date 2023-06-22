
const content = `

<style>
.no_result {
	margin: 0.3rem;
	padding: 0.3rem 0.5rem;
	list-style: none;
	text-align: left;
	font-size: 1rem;
	color: #212121;
	transition: all 0.1s ease-in-out;
	border-radius: 0.35rem;
	background-color: rgba(255, 255, 255, 1);
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	transition: all 0.2s ease;
	outline: none;
}

h1 {
	color: rgba(255, 122, 122, 1);
	transition: var(--transition-1);
}

h1 > a {
	text-decoration: none;
	color: rgba(255, 122, 122, 1);
}

h1 > a::selection {
	color: rgb(255, 122, 122);
}

h4 {
	margin-bottom: 5px;
	color: #ffc6c6;
}

h4::selection {
	color: #ffc6c6;
}

.mode {
	margin-top: 20px;
}

.toggle {
	display: flex;
	border: 1px solid #ffc6c6;
	height: 35px;
	width: 120px;
	border-radius: 50px;
	justify-content: flex-start;
	align-content: center;
	transition: var(--transition-2);
}

.toggler {
	display: grid;
	cursor: pointer;
	background-color: rgba(255, 198, 198, 1);
	color: #fff;
	height: 25px;
	width: 60px;
	border-radius: 50px;
	margin: 5px;
	text-align: center;
	align-content: center;
	align-self: flex-start;
	transition: var(--transition-2);
	user-select: none;
	-webkit-user-select: none;
	-moz-user-select: none;
	-webkit-touch-callout: none;
}

.toggler:hover {
	width: 65px;
	background-color: rgba(255, 122, 122, 0.7);
}

.toggler::selection {
	color: #fff;
}

.strict {
	display: inline;
}

.loose {
	display: inline;
}

.selection {
	margin-top: 25vh;
	font-size: 2rem;
	font-weight: bold;
	color: #ffc6c6;
	transition: var(--transition-1);
}

.selection::selection {
	color: #64ceaa;
}

@media only screen and (max-width: 600px) {
	.selection {
		margin-top: 15vh;
	}
}
.autoComplete_wrapper input {
  width: 100%;
  padding: 10px 20px;
  border-radius: 42px;
  border: none;
}
.products {
  background: #fff;
  color: #000;
  padding: 30px;
  width: 100%;
}
.products li {
  padding-bottom: 10px;
  border-bottom: 1px solid #000;
}
</style>

<div class="container">
	<div class="body" align="center">
		<div class="autoComplete_wrapper">
			<input id="autoComplete" type="text" tabindex="1">
		</div>
    <ul class="products"></ul>
    </div>
		<div class="selection"></div>
	</div>
</div>
`


commands.add('addProductCommand', {
    run(editor, sender) {
        editor.Modal.open({
            title: 'Select Product', // string | HTMLElement
            content: content, // string | HTMLElement
        });


        $(document).on("keyup", "#autoComplete", function (e) {
          e.preventDefault();

          if($(this).val().length <= 0){
            console.log($(".products li"))
            $(".products li").remove()
          }

          $.post({
            url: pageDataEl.data("search-link"),
            data: {
              search : $(this).val()
            },
          }).done(response => {
        
            $(".products").empty()
            response.data.map(product => {
                $(".products").append(`
                    <li >${product.title}</li>
                `)
            })
          })
        })


        
// The autoComplete.js Engine instance creator
// const autoCompleteJS = new autoComplete({
// 	data: {
// 		src: async () => {
// 			try {
// 				// Loading placeholder text
// 				document
// 					.getElementById("autoComplete")
// 					.setAttribute("placeholder", "Loading...");
// 				// Fetch External Data Source
// 				const source = await fetch(
// 					"https://tarekraafat.github.io/autoComplete.js/demo/db/generic.json"
// 				);
// 				const data = await source.json();
// 				// Post Loading placeholder text
// 				document
// 					.getElementById("autoComplete")
// 					.setAttribute("placeholder", autoCompleteJS.placeHolder);
// 				// Returns Fetched data
// 				return data;
// 			} catch (error) {
// 				return error;
// 			}
// 		},
// 		keys: ["food", "cities", "animals"],
// 		cache: true,
// 		filter: (list) => {
// 			// Filter duplicates
// 			// incase of multiple data keys usage
// 			const filteredResults = Array.from(
// 				new Set(list.map((value) => value.match))
// 			).map((food) => {
// 				return list.find((value) => value.match === food);
// 			});

// 			return filteredResults;
// 		}
// 	},
// 	placeHolder: "Search for product",
// 	resultsList: {
// 		element: (list, data) => {
// 			const info = document.createElement("p");
// 			if (data.results.length > 0) {
// 				info.innerHTML = `Displaying <strong>${data.results.length}</strong> out of <strong>${data.matches.length}</strong> results`;
// 			} else {
// 				info.innerHTML = `Found <strong>${data.matches.length}</strong> matching results for <strong>"${data.query}"</strong>`;
// 			}
// 			list.prepend(info);
// 		},
// 		noResults: true,
// 		maxResults: 15,
// 		tabSelect: true
// 	},
// 	resultItem: {
// 		element: (item, data) => {
// 			// Modify Results Item Style
// 			item.style = "display: flex; justify-content: space-between;";
// 			// Modify Results Item Content
// 			item.innerHTML = `
//       <span style="text-overflow: ellipsis; white-space: nowrap; overflow: hidden;">
//         ${data.match}
//       </span>
//       <span style="display: flex; align-items: center; font-size: 13px; font-weight: 100; text-transform: uppercase; color: rgba(0,0,0,.2);">
//         ${data.key}
//       </span>`;
// 		},
// 		highlight: true
// 	},
// 	events: {
// 		input: {
// 			focus: () => {
// 				if (autoCompleteJS.input.value.length) autoCompleteJS.start();
// 			}
// 		}
// 	}
// });

// autoCompleteJS.input.addEventListener("init", function (event) {
//   console.log(event);
// });

// autoCompleteJS.input.addEventListener("response", function (event) {
//   console.log(event.detail);
// });

// autoCompleteJS.input.addEventListener("results", function (event) {
//   console.log(event.detail);
// });

// autoCompleteJS.input.addEventListener("open", function (event) {
//   console.log(event.detail);
// });

// autoCompleteJS.input.addEventListener("navigate", function (event) {
//   console.log(event.detail);
// });

// autoCompleteJS.input.addEventListener("selection", function (event) {
// 	const feedback = event.detail;
// 	autoCompleteJS.input.blur();
// 	// Prepare User's Selected Value
// 	const selection = feedback.selection.value[feedback.selection.key];
// 	// Render selected choice to selection div
// 	document.querySelector(".selection").innerHTML = selection;
// 	// Replace Input value with the selected value
// 	autoCompleteJS.input.value = selection;
// 	// Console log autoComplete data feedback
// 	console.log(feedback);
// });

// autoCompleteJS.input.addEventListener("close", function (event) {
//   console.log(event.detail);
// });

// // Toggle Search Engine Type/Mode
// document.querySelector(".toggler").addEventListener("click", () => {
// 	// Holds the toggle button selection/alignment
// 	const toggle = document.querySelector(".toggle").style.justifyContent;

// 	if (toggle === "flex-start" || toggle === "") {
// 		// Set Search Engine mode to Loose
// 		document.querySelector(".toggle").style.justifyContent = "flex-end";
// 		document.querySelector(".toggler").innerHTML = "Loose";
// 		autoCompleteJS.searchEngine = "loose";
// 	} else {
// 		// Set Search Engine mode to Strict
// 		document.querySelector(".toggle").style.justifyContent = "flex-start";
// 		document.querySelector(".toggler").innerHTML = "Strict";
// 		autoCompleteJS.searchEngine = "strict";
// 	}
// });

// Blur/unBlur page elements
// const action = (action) => {
// 	const title = document.querySelector("h1");
// 	// const mode = document.querySelector(".mode");
// 	const selection = document.querySelector(".selection");
// 	// const footer = document.querySelector(".footer");

// 	if (action === "dim") {
// 		title.style.opacity = 1;
// 		// mode.style.opacity = 1;
// 		selection.style.opacity = 1;
// 	} else {
// 		title.style.opacity = 0.3;
// 		// mode.style.opacity = 0.2;
// 		selection.style.opacity = 0.1;
// 	}
// };

// // Blur/unBlur page elements on input focus
// ["focus", "blur"].forEach((eventType) => {
// 	autoCompleteJS.input.addEventListener(eventType, () => {
// 		// Blur page elements
// 		if (eventType === "blur") {
// 			action("dim");
// 		} else if (eventType === "focus") {
// 			// unBlur page elements
// 			action("light");
// 		}
// 	});
// });






    },
    stop(editor, sender) {
        editor.Modal.close()
    },
});

