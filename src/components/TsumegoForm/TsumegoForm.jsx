import { Field, Form, Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import { getUser } from '../../services/session/session'
import { Goban } from 'react-goban'
import letters from '../../utils/boardCoords'
import pbFrontToBack from '../../utils/pbFrontToBack'
import { createTsumego } from '../../services/api/tsumegos'
import { useNavigate } from 'react-router-dom'

const TsumegoForm = () => {
    const navigate = useNavigate()
    const [coordList, setCoordList] = useState([])
    const [boardSize, setBoardSize] = useState(9)
    const [nextColor, setNextColor] = useState("black")
    const [stones, setStones] = useState({})
    const [solColor, setSolColor] = useState("black")
    const user = getUser()
    const initials = {problem_desc: {}, description: null, difficulty: "ELM", submitter:user?.user.id}

    const handleOptionChange = (event) => {
        setBoardSize(event.target.value)
        setStones({})
    }
    const handleIntersectionClick = (coord) => {
        setStones((prevStones) => {
            const newStones = { ...prevStones }
            newStones[coord] = nextColor
            return newStones
        })
        setNextColor(nextColor == "black"? "white": "black")
    }
    const handleSolColor = (event) => {
        setSolColor(event.target.value)
        console.log(solColor)
    }

    useEffect(() => {
        const newCoordList = []
        for (let j = 0; j <= letters.length; j++){
            for (let i = 1; i <= Number(boardSize); i++) {
                newCoordList.push(letters[j]+i)
            }
            if (j+1 === Number(boardSize)) break
        }
        setCoordList(newCoordList)
        console.log(coordList)
    }, [boardSize, stones])
    
    return (
        <div className="mt-5">
            <Formik initialValues={initials}
            onSubmit={(values) => {
                values.problem_desc = pbFrontToBack(stones, solColor, values.sol_coord, boardSize, nextColor)
                console.log(values)
                // envoyer la requête
                const execAsync = async () => {
                    try {
                        const response = await createTsumego(values)
                        console.log(response)
                        // message
                        alert("Tsumego enregistré")
                        // redirection page tsumego
                        navigate("/listgames")
                    } catch (error) {
                        const errorData = error?.response;
                        if (errorData) console.log(errorData);
                    }
                } 
                execAsync()
            }}>
                <Form>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-8 d-flex justify-content-center">
                                <Goban size={boardSize} theme="classic" stones={stones} nextToPlay={nextColor} onIntersectionClick={handleIntersectionClick} />
                            </div>
                            <div className="col-md-4">
                                <div className="btn-group mb-4" role="group" aria-label="Basic radio toggle button group">
                                    <input type="radio" className="btn-check" name="bord_size" value={9} id="btnradio1" autoComplete="off" checked={boardSize === "9"} onChange={handleOptionChange}/>
                                    <label class="btn btn-outline-secondary" htmlFor="btnradio1">9x9</label>

                                    <input type="radio" className="btn-check" name="bord_size" value={13} id="btnradio2" autoComplete="off" checked={boardSize === "13"} onChange={handleOptionChange}/>
                                    <label class="btn btn-outline-secondary" htmlFor="btnradio2">13x13</label>

                                    <input type="radio" className="btn-check" name="bord_size" value={19} id="btnradio3" autoComplete="off" checked={boardSize === "19"} onChange={handleOptionChange}/>
                                    <label class="btn btn-outline-secondary" htmlFor="btnradio3">19x19</label>
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="description" className="form-label">Description du problème</label>
                                    <Field name="description" as="textarea" className="form-textarea form-control" />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="difficulty" className="form-label">Niveau de difficulté</label>
                                    <Field name="difficulty" as="select" className="my-select form-select">
                                        <option value="ELM">Elémentaire</option>
                                        <option value="BEG">Débutant</option>
                                        <option value="INT">Intermédiaire</option>
                                        <option value="ADV">Avancé</option>
                                    </Field>
                                </div>
                                <div>
                                    <label htmlFor="sol_coord">Solution</label>
                                    <div className="d-flex align-items-center">
                                        <div className="form-check me-3">
                                            <input className="form-check-input" type="radio" name="sol_color" id="sol_color_b" value={"black"} onChange={handleSolColor} checked={solColor === "black"}/>
                                            <label className="form-check-label" htmlFor="sol_color_b">Noir</label>
                                        </div>
                                        <div className="form-check me-3">
                                            <input className="form-check-input" type="radio" name="sol_color" id="sol_color_w" value={"white"} onChange={handleSolColor} checked={solColor === "white"}/>
                                            <label className="form-check-label" htmlFor="sol_color_w">Blanc</label>
                                        </div>
                                        <div>                                
                                            <Field name="sol_coord" as="select" className="my-select form-select" id="sol_coord">
                                                {  
                                                    coordList.map((coord, index) => (
                                                        <option key={index} value={coord}>{coord}</option>
                                                    ))                                         
                                                }
                                            </Field>
                                        </div>                            
                                    </div>                        
                                </div>
                                <div className="mt-4">
                                    <button type="submit" className='btn btn-primary'>Soumettre</button>
                                </div>
                            </div>                             
                        </div>                       
                    </div>
                </Form>
            </Formik>
        </div>
    )
}

export default TsumegoForm