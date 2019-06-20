
const dbHelpers = require('./mysqlHelpers');

/* Step 2. get connection */
const dbTest = async () => {
	try {
		const connection = await dbHelpers.pool.getConnection(async conn => conn);
		try {
			/* Step 3. */
			const ID = 'HELLO';
			const PW = 'WORLD';
			await connection.beginTransaction(); // START TRANSACTION
			const [rows] = await connection.query('INSERT INTO MEMBERS_INFO(ID, PW) VALUES(?, ?)', [ID, PW]);
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
  }