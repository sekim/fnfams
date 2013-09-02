<!--#Include Virtual="/fng/common_inc.asp"-->
<%
	Dim Rs, ConnFF, strSQL, jsonText, custCd, fundCd
	custCd = request.querystring("cust_cd")
	fundCd = request.querystring("fund_cd")
	Set ConnFF = Server.CreateObject("ADODB.Connection")
	Set Rs = Server.CreateObject("ADODB.Recordset")
	ConnFF.ConnectionString = gvConnFF
	ConnFF.Open
	strSQL = "select rownum rn, a.* from ( select a.* from AM_FBT010 a where cust_cd = '" & custCd & "' and fund_cd = '" & fundCd & "' order by std_dt asc ) a order by rn desc"
	jsonText = QueryToJSON(ConnFF, strSQL).Flush
	'response.write(strSQL)
	Response.Write(jsonText)
%>