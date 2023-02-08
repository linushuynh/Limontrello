# [![SVG Banners](https://svg-banners.vercel.app/api?type=luminance&text1=Limontrello%20🍋&width=1000&height=350)](https://github.com/Akshay090/svg-banners)

[Limontrello](https://limontrello.onrender.com/) is a website inspired by [Trello](https://trello.com/home). Limontrello is a great tool for productivity and organizing tasks. Each user is able to make as many boards as they desire and within those boards they are able to make cards that can be labeled.

Limontrello also utilizes the [React Beautiful DnD](https://github.com/atlassian/react-beautiful-dnd) package to allow users to drag and drop cards.

### Live Site: [Limontrello](https://limontrello.onrender.com/)


**Frameworks, Platforms and Libraries:**

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) ![Python](https://img.shields.io/badge/python-yellow?style=for-the-badge&logo=python&logoColor=blue) ![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white) ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![Flask](https://img.shields.io/badge/Flask-%23404d59.svg?style=for-the-badge&logo=flask&logoColor=%2361DAFB) ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white) ![React Beautiful DnD](https://img.shields.io/badge/React_Beautiful_DnD-ff69b4?style=for-the-badge&logo=react&logoColor=69FFB4)

**Database:**

![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)

**Hosting:**

![Render](https://img.shields.io/badge/Render-informational?style=for-the-badge&logo=render&logoColor=%5bdec3)

## ✅ Wiki Link

- [Database Schema](https://github.com/linushuynh/Limontrello/wiki/DB-Schema-1.1)
- [Feature List](https://github.com/linushuynh/Limontrello/wiki/Features-List)
- [Redux State Shape](https://github.com/linushuynh/Limontrello/wiki/Redux-Shape)
- [User Stories](https://github.com/linushuynh/Limontrello/wiki/User-Stories)

## 📷 Screenshots

### Landing
![image](https://user-images.githubusercontent.com/109188075/211251771-6178d9f0-83cc-4219-a8e5-a731db11e800.png)

### Sign Up Page
![image](https://user-images.githubusercontent.com/109188075/211121260-9e91ed1d-bf89-4490-a3bf-b14490ca284f.png)

### Dashboard
<img width="1919" alt="Screenshot 2023-02-07 230651" src="https://user-images.githubusercontent.com/109188075/217458827-92bbe043-44bb-4fd2-b39a-65a57ecdf0e6.png">


### Main Board View
<img width="1594" alt="Screenshot 2023-02-07 230920" src="https://user-images.githubusercontent.com/109188075/217459082-152c1375-5489-46f3-9228-0a0b83c0bfc8.png">


### Example Drag n Drop
![Untitled video - Made with Clipchamp (3)](https://user-images.githubusercontent.com/109188075/211144776-ab4b6b14-a887-4059-85ab-d05a80a9c3fc.gif)


## ✂️ Code Snippets

### Snippet 1 (Create board API route)
#### *The following code is snipped from from API board routes and gets hit when a request to create a new board is sent to /api/boards*
```bash
@board_routes.route('', methods=["POST"])
@login_required
def create_board():
    """
    Create a new board for the user and append 3 lists for the new board to
    start with
    """
    form = BoardForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        data = form.data
        new_board = Board(
            name = data["name"],
            background = data["background"],
            private = data["private"],
            user_id = current_user.id
        )
        db.session.add(new_board)
        db.session.commit()

        # Add 3 default lists to newly created boards
        if len(new_board.lists) < 1:
            new_list1 = CardList(
                name = "To-Do",
                board_id = new_board.id
            )
            new_list2 = CardList(
                name = "In Progress",
                board_id = new_board.id
            )
            new_list3 = CardList(
                name = "Complete",
                board_id = new_board.id
            )
            new_board.lists.append(new_list1)
            new_board.lists.append(new_list2)
            new_board.lists.append(new_list3)
            db.session.add(new_board)
            db.session.commit()

        return new_board.to_dict()

    return {'error': validation_errors_to_error_messages(form.errors)}, 401
```

### Snippet 2 (Create Card Component)
#### *This snippet of code showcases the component responsible for proving the form to allow the user to create a new card*
```bash
const CreateCardForm = ({ listId, setShowAddCardModal }) => {
    const [title, setTitle] = useState("")
    const dispatch = useDispatch()
    const currentUser = useSelector(state => state.session.user)
    const textRef = useRef(null)
    const { setHasSubmitted } = useContext(SubmittedContext)

    // Places text cursor and scrolls into view
    useEffect(() => {
        textRef.current.focus()
        textRef.current.scrollIntoView()
    }, [textRef])

    const closeCardForm = (e) => {
        e.preventDefault()
        setShowAddCardModal(false)
    }

    const submitNewCard = async (e) => {
        e.preventDefault()
            let input = {
                title,
                description: "",
                listId
            }
            setShowAddCardModal(false)
            await dispatch(createCardThunk(input, currentUser.id))
            setHasSubmitted(prev => !prev)
    }

    return (
        <div className={styles.formContainer}>
            <form className={styles.form}>
                <div className={styles.inputContainer}>
                    <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter a title for this card..."
                    className={styles.inputArea}
                    ref={textRef}
                    maxLength={100}
                    type="text"
                    />
                </div>
                <div className={styles.titleCount}>
                    {title.length}/100 characters
                </div>
                <div className={styles.buttonsContainer}>
                    <button type="submit" className={styles.addCardButton} onClick={submitNewCard}>Add card</button>
                    <button onClick={closeCardForm} className={styles.Xbutton}>
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>
            </form>
        </div>
    )
}
```

## 💻 Run Limontrello on Local

Clone the project

```bash
git clone https://github.com/linushuynh/Limontrello.git
```

Install dependencies

```bash
cd react-app
npm install
cd ..
pipenv install -r requirements.txt
pipenv run
flask db upgrade
flask seed all
```

Setup the Environment Variables

To run this project, you will need to add a .env file in the root of your directory
To do this, duplicate(copy/paste) the **.env.example** file in the root directory then rename the copy to **.env**
Make sure the SECREY_KEY, DATABASE_URL, and SCHEMA are the same.

Start the backend of the server

```bash
pipenv run flask run
```

Open another terminal window(make sure you're in the root directory) then run

```bash
cd react-app
npm start
```

**Then you can visit localhost:3000 to view your local version of Limontrello!**
