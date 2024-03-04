import { useEffect, useState } from 'react';
/**
 * Note component
 * 
 * This is the note code to allow the users to
 * add, edit or delete notes
 * 
 * @author Ryan Field
 * @author John Rooksby - Used some of the example code
 * @author CHATGPT - Helped with the tailwind styling
 */
function Note(props) {
    const [note, setNote] = useState("");
    const [isFetching, setIsFetching] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Only fetch the note if content_id is present
        if (props.content_id) {
            setIsFetching(true);
            fetch('https://w20017978.nuwebspace.co.uk/coursework/App/note?content_id=' + props.content_id, {
                method: 'GET',
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem('token'),
                },
            })
            .then(res => {
                if (!res.ok) {
                    // Handle 404 Not Found separately if needed
                    if (res.status === 404) {
                        setError('Note not found for this content.');
                        setIsFetching(false);
                        return;
                    }
                    throw new Error('Network response was not ok');
                }
                return res.json();
            })
            .then(data => {
                if (data) {
                    setNote(data.note);
                }
                setIsFetching(false);
            })
            .catch(error => {
            setError(error.message);
            setIsFetching(false);
        });
    }
}, [props.content_id]);

//stops the content from bubbling up and allowing you to add notes
    const handleNoteChange = (e) => {
        e.stopPropagation();
        setNote(e.target.value);
    };

    const saveNote = (e) => {
        e.stopPropagation(); // Prevent event from bubbling up
    
        const data = {
            content_id: props.content_id,
            note: note
        };
    //fetches the url so it can post the information
        fetch('https://w20017978.nuwebspace.co.uk/coursework/App/note', {
            method: 'POST',
            headers: new Headers({
                "Authorization": "Bearer " + localStorage.getItem('token'),
                'Content-Type': 'application/json' 
            }),
            body: JSON.stringify(data), // Stringify the JSON data to send in the request body
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Success:', data);
            // Update the note state with the returned data, or clear it if none returned
            setNote(data.note || ''); 
        })
        .catch((error) => {
            console.error('Error:', error);
            setError(error.message); // Set the error state to display the error message
        });
    };
    

    const deleteNote = (e) => {
        e.stopPropagation();
        // fetches the url note and will use the delete method if its successful
        fetch('https://w20017978.nuwebspace.co.uk/coursework/App/note', { 
            method: 'DELETE', 
            headers: new Headers({
                "Authorization": "Bearer " + localStorage.getItem('token'),
                'Content-Type': 'application/json' 
            }),
            body: JSON.stringify({ content_id: props.content_id, note: note }) // Include the required data
        })
        .then(response => {
            if (!response.ok) {
                // If the server sends additional error information, log or display it
                return response.text().then(text => { throw new Error(text || 'Network response was not ok') });
            }
            return response.json();
        })
        .then(data => {
            console.log('Note deleted:', data);
            setNote(""); // Clear the note from state after deletion
        })  
    .catch((error) => {
        console.error('Error:', error);
        try {
            // Attempt to parse the error as JSON
            const errorData = JSON.parse(error.message);
            // Set a state variable to the parsed error message if needed
            setError(errorData.message);
        } catch {
            // If error is not JSON, it's likely a network or text error, so just display it
            setError(error.message);
        }
    });
    
    };
    
//tailwind style for the buttons
    return (
        <div className="flex flex-col p-5" onClick={(e) => e.stopPropagation()}>
            <textarea 
                name="note"
                placeholder="Type your note here" 
                rows="4" 
               cols="50"
                maxLength="250"
                className="p-2 border-2 border-gray-300"
                value={note}
                onChange={handleNoteChange}
            />
                <div className="flex space-x-2 mt-2">
                <button 
                 type="button" 
                 className="flex-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                 onClick={saveNote}
             >
                Save
                </button>
                <button 
                 type="button" 
                 className="flex-1 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                 onClick={deleteNote}
             >
                Delete
                </button>
                </div>
                </div>
            )
}

export default Note;