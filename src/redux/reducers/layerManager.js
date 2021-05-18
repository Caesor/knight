// import { ADD_TODO, TOGGLE_TODO } from '../actionTypes';

const initialState = {
    sprites: [],
};

export default function (state = initialState, action) {
    switch (action.type) {
        case 'ADD_SPRITE': {
            const { id, content } = action.payload;
            return {
                ...state,
                allIds: [...state.allIds, id],
                byIds: {
                    ...state.byIds,
                    [id]: {
                        content,
                        completed: false,
                    },
                },
            };
        }
        default:
            return state;
    }
}
