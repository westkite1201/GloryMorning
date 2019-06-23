
const dbHelpers = require('./mysqlHelpersPromise');

/* Step 2. get connection */
const dbTest = async (param1, param2, param3) => {
	try {
		const connection = await dbHelpers.pool.getConnection(async conn => conn);
		try {
			/* Step 3. */
			const ID = 'HELLO';
			const PW = 'WORLD';
			//await connection.beginTransaction(); // START TRANSACTION
			const [rows] = await connection.query('SELECT * FROM CQMS_MEMBER');
			//const [rows] = await connection.query('INSERT INTO MEMBERS_INFO(ID, PW) VALUES(?, ?)', [ID, PW]);
			//const [rows] = await connection.query('INSERT INTO MEMBERS_INFO(ID, PW) VALUES(?, ?)', [ID, PW]);
			await connection.commit(); // COMMIT
			connection.release();
            return rows;
            
		} catch(err) {
			await connection.rollback(); // ROLLBACK
			connection.release();
			console.log('Query Error');
			return false;
        }
        
	} catch(err) {
		console.log('DB Error');
		return false;
	}
};


/* Step 2. get connection */
const getLocation = async (parameter) => {
	try {
		const locationA = parameter.LOCATION_A === '서울' ? parameter.LOCATION_A + '특별시' : ( parameter.LOCATION_A) ;
		const locationB = parameter.LOCATION_B;
		const locationC = parameter.LOCATION_C;
		console.log(locationA)
		console.log(locationB)
		console.log(locationC)
		
		const connection = await dbHelpers.pool.getConnection(async conn => conn);
		try {
			/* Step 3. */
			let sql = ` SELECT X,Y 
						FROM KOREA_LOCATION
						WHERE LOCATION_A = ? 
							AND LOCATION_B = ? 
							AND LOCATION_C = ? `
			
			
			const [rows] = await connection.query(sql, ['서울특별시', '관악구', '인헌동']);
			
			
			//await connection.beginTransaction(); // START TRANSACTION
			//const [rows] = await connection.query(sql,[locationA, locationB, locationC]);
			//const [rows] = await connection.query('INSERT INTO MEMBERS_INFO(ID, PW) VALUES(?, ?)', [ID, PW]);
			//const [rows] = await connection.query('INSERT INTO MEMBERS_INFO(ID, PW) VALUES(?, ?)', [ID, PW]);
			await connection.commit(); // COMMIT
			connection.release();
            return rows;
            
		} catch(err) {
			await connection.rollback(); // ROLLBACK
			connection.release();
			console.log('Query Error');
			return false;
        }
        
	} catch(err) {
		console.log('DB Error');
		return false;
	}
};









module.exports = {
	dbTest : dbTest,
	getLocation : getLocation,
  }