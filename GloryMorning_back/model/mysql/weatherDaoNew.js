
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
/* 선택된 로케이션 저장  */

/**
 * 벌크 인서 트 
 * @param {
 * var sql = "INSERT INTO Test (name, email, n) VALUES ?";
var values = [
    ['demian', 'demian@gmail.com', 1],
    ['john', 'john@gmail.com', 2],
    ['mark', 'mark@gmail.com', 3],
    ['pete', 'pete@gmail.com', 4]} parameter 
 */
const settingLocation = async (parameter) => {
	try {
		const settingLocationArray = parameter.settingLocationArray;
		let locationArray = [];
		for(let data of settingLocationArray){
			let address_name = data.addressName;
			let address_type = data.addressType;
			/* INT 로 갈지 말지 정하자  */
			let x = data.x;
			let y = data.y;
			let mem_idx = 1
			locationArray.push([address_name, address_type, x, y, mem_idx]); 
		}

		console.log("settingLocationArray " , settingLocationArray)
		console.log("locationArray " , locationArray)
		const connection = await dbHelpers.pool.getConnection(async conn => conn);
		try {
			await connection.beginTransaction(); // START TRANSACTION
			// /* Step 3. */
			let sql = `REPLACE INTO setting_location(ADDRESS_NAME ,ADDRESS_TYPE, X ,Y,MEM_IDX)
					   VALUES ?`
			
			const [insertRow] = await connection.query(sql, [locationArray]);
			const [rows] = await connection.query(`SELECT * FROM SETTING_LOCATION`);
			
			// //await connection.beginTransaction(); // START TRANSACTION
			// //const [rows] = await connection.query(sql,[locationA, locationB, locationC]);
			// //const [rows] = await connection.query('INSERT INTO MEMBERS_INFO(ID, PW) VALUES(?, ?)', [ID, PW]);
			// //const [rows] = await connection.query('INSERT INTO MEMBERS_INFO(ID, PW) VALUES(?, ?)', [ID, PW]);
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

/*getSettingLocation */
const getSettingLocation = async() => {
	try {
		const connection = await dbHelpers.pool.getConnection(async conn => conn);
		try {
			const [rows] = await connection.query(`SELECT * FROM SETTING_LOCATION`);	
			//console.log("[SEO] ROWS ", rows)
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
		console.log('DB Error', err);
		return false;
	}
};


const getLocation = async (parameter) => {
	try {
		const locationA = parameter.LOCATION_A === '서울' ? parameter.LOCATION_A + '특별시' : ( parameter.LOCATION_A) ;
		const locationB = parameter.LOCATION_B;
		const locationC = parameter.LOCATION_C;
		// console.log(locationA)
		// console.log(locationB)
		// console.log(locationC)
		
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


const getWeatherData = async (parameter) => {
	try {
		const nx = parameter.nx;
		const ny = parameter.ny;
		const category = parameter.category;		
		console.log("#################" ,nx, ny  ,category )
		const connection = await dbHelpers.pool.getConnection(async conn => conn);
		try {

		
			/* Step 3. */
			let sql = `SELECT *
					   FROM WEATHER
						WHERE NX = ? AND NY = ?
							AND CATEGORY = ?
							AND FCST_DATE >= ( SELECT date_format( now() - INTERVAL 2 DAY, '%Y%m%d') )
							AND FCST_DATE <= ( SELECT date_format( now() + INTERVAL 1 DAY, '%Y%m%d') )`

			
			const [rows] = await connection.query(sql, [ nx, ny, category ]);
			
			
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


const getWeatherDataShortTerm = async (parameter) => {
	try {
		const nx = parameter.nx;
		const ny = parameter.ny;
		//const category = parameter.category;		
		const connection = await dbHelpers.pool.getConnection(async conn => conn);
		try {
			/* Step 3. */
			let sql = ` 
						SELECT *
						FROM weather_short_term
						WHERE NX = ? AND NY = ?
						AND FCST_DATE = ( SELECT date_format( now(), '%Y%m%d') )
						AND FCST_TIME = ( SELECT date_format( now(), '%H00') )  `
			
			const [rows] = await connection.query(sql, [ nx, ny ]);
			
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




/* 현재 성공 함 */
/* WEATHER DATA REPLACE  */
const insertWeatherData = async (parameter) => {
	console.log("dao insertWeatherData start ")
	let list = parameter;
	try {

		const connection = await dbHelpers.pool.getConnection(async conn => conn);
		try {
			/* Step 3. */
			let sql = `REPLACE INTO weather(FCST_DATE, FCST_TIME,CATEGORY, FCST_VALUE, NX ,NY, BASE_DATE, BASE_TIME)
			VALUES ?`

				
			const [rows] = await connection.query(sql, [list]);
					
			//await connection.beginTransaction(); // START TRANSACTION
			//const [rows] = await connection.query(sql,[locationA, locationB, locationC]);
			//const [rows] = await connection.query('INSERT INTO MEMBERS_INFO(ID, PW) VALUES(?, ?)', [ID, PW]);
			//const [rows] = await connection.query('INSERT INTO MEMBERS_INFO(ID, PW) VALUES(?, ?)', [ID, PW]);
			await connection.commit(); // COMMIT
			connection.release();
			return new Promise((resolve, reject)=>{
				console.log("return promise")
				resolve(rows)
			  })
            
		} catch(err) {
			await connection.rollback(); // ROLLBACK
			connection.release();
			console.log('Query Error');
			return new Promise((resolve, reject)=>{
				reject({message: err})
			})
        }
        
	} catch(err) {
		console.log('DB Error');
		return false;
	}
};

const insertWeatherDataShortTerm = async (parameter) => {
	let list = parameter;
	try {

		const connection = await dbHelpers.pool.getConnection(async conn => conn);
		try {
			/* Step 3. */
			let sql = `REPLACE INTO weather_short_term(FCST_DATE, FCST_TIME,CATEGORY, FCST_VALUE, NX ,NY,BASE_DATE, BASE_TIME)
			VALUES ?`

				
			const [rows] = await connection.query(sql, [list]);
					
			//await connection.beginTransaction(); // START TRANSACTION
			//const [rows] = await connection.query(sql,[locationA, locationB, locationC]);
			//const [rows] = await connection.query('INSERT INTO MEMBERS_INFO(ID, PW) VALUES(?, ?)', [ID, PW]);
			//const [rows] = await connection.query('INSERT INTO MEMBERS_INFO(ID, PW) VALUES(?, ?)', [ID, PW]);
			await connection.commit(); // COMMIT
			connection.release();
			console.log('success QueryInserting ')
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
	getWeatherData : getWeatherData,
	getWeatherDataShortTerm : getWeatherDataShortTerm,
	insertWeatherData : insertWeatherData,
	insertWeatherDataShortTerm : insertWeatherDataShortTerm,
	settingLocation : settingLocation,
	getSettingLocation : getSettingLocation,
  }