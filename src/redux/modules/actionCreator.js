const APP = 'RBGF';

const createAction = (module) => (action) => `${APP}/${module}/${action}`;

export default createAction;