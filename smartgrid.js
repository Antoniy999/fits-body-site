const smartgrid = require('smart-grid');

const settings = {
	outputStyle: 'less',
	container: {
		maxWidth: '1170px',
		fields: '0px'
	},
	breakPoints: {
		md: {
            width: '960px',
            fields: '20px'
        },
        sm: {
            width: '768px',
            fields: '15px'
        },
        xs: {
            width: '576px',
            fields: '10px'
        },
        xxs: {
            width: '420px',
            fields: '10px'
        }
	},
	oldSizeStyle: false,
	preperties: []
}; 

smartgrid('./src/precss');