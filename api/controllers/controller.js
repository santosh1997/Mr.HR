var con = require('./db');
var ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');
var toneAnalyzerV3 = new ToneAnalyzerV3({
  version: '2017-09-21',
  username: '95ac322b-d6f4-4b9e-b461-dae0e30e3b82',
  password: '36IJZmRTilsA'
});

		




exports.fun = {
	test : function(req,res){
		var text = req.body.value;
		//var text = 'Team, I know that times are tough! Product sales have been disappointing for the past three quarters. We have a competitive product, but we need to do a better job of selling it!'

		var params = {
		  'tone_input': { 'text': text },
		  'content_type': 'application/json'
		};

		toneAnalyzerV3.tone(params, function (error, response) {
		  if (error)
		  	res.send(JSON.stringify(error));
		  else
		    res.send(response.document_tone.tones[0].tone_id);
		console.log(text);
		console.log(JSON.stringify(response));
		});
	},
	logging : function(req,res){
		var userid = req.body.userid;
		con.query("SELECT * FROM san.questable ORDER BY RAND() LIMIT 10",function(err,result){
			for(var k=0;k<10;k++){
				var val = [userid,k+1,result[k].ques];
				con.query("INSERT INTO san.finaltestdata (userid,quesid,ques) VALUES (?,?,?)",val,function(err,result){});
			}
			res.send("done");
		});
	},
	quesfetch : function(req,res){
		var userid = req.body.userid;
		con.query("SELECT * FROM san.finaltestdata WHERE userid=?",[userid],function(err,result){
			res.json(result);
		});
	},
	userfetch : function(req,res){
		con.query("SELECT userid FROM san.restable group by userid;",function(err,result){
			res.json(result);
		});
	},
	resfetch : function(req,res){
		var value = req.body.userid;
		con.query("SELECT * FROM san.restable where userid=?",[value],function(err,result){
			res.json(result);
		});
	},
	ansupdate : function(req,res){
		var userid = req.body.userid;
		var value = [req.body.currentans,req.body.userid,req.body.activeques];
		var text = req.body.currentans;
		con.query("UPDATE san.finaltestdata SET usrans=? WHERE userid=? AND quesid=?",value,function(err,result)
		{
			var params = {
			  'tone_input': { 'text': text },
			  'content_type': 'application/json'
			};

			toneAnalyzerV3.tone(params, function (error, response) {
					//console.log(text);
					console.log(JSON.stringify(response));
					if(response.document_tone.tones.length>0){
					  var tone = response.document_tone.tones[0].tone_id;
					  var tonescore = response.document_tone.tones[0].score;
					  var val = [userid,tone];
					  
					  var fullvalue = [userid,tone,'1',tonescore];
					  con.query("SELECT * FROM san.restable WHERE userid=? AND tone=?",val,function(err,resultsec){
						  if(resultsec.length>0){
						  	var newtoneavg = ((parseFloat(resultsec[0].toneans)*parseFloat(resultsec[0].toneavg))+parseFloat(tonescore))/(parseFloat(resultsec[0].toneans)+1);
						  	var newtoneans = parseFloat(resultsec[0].toneans)+1;
						  	var value = [newtoneavg,newtoneans,userid,tone];
						  	con.query("UPDATE san.restable SET toneavg=?,toneans=? WHERE userid=? AND tone=?",value,function(err,resultthird){});
						  }
						  else{
						  	con.query("INSERT INTO san.restable (userid,tone,toneans,toneavg) VALUES (?,?,?,?)",fullvalue,function(err,result){});
						  }
					  });
					}
			});
		});
		con.query("SELECT * FROM san.finaltestdata WHERE userid=?",[userid],function(err,result){
			res.json(result);
		});
	}
}