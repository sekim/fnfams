<%@LANGUAGE="VBSCRIPT" CODEPAGE="65001"%>
<!--#Include virtual="/fng/common_inc.asp"-->
<%
	Response.Buffer = True
	Response.Clear
	Response.ContentType = "application/vnd.ms-excel; charset=utf-8" 
	Response.CacheControl = "private"
	Response.AddHeader "cache-control","private"
	Response.AddHeader "Pragma","no-cache"

	dim filename
	filename = request.querystring("filename")
	if filename = "" then filename = "fams" end if

	Response.AddHeader "content-disposition", "Attachment; filename=" & filename & ".xls"
	
	Dim Rs, ConnFF, strSQL, jsonText, custCd
	CustCd = request.querystring("cust_cd")
	Set ConnFF = Server.CreateObject("ADODB.Connection")
	Set Rs = Server.CreateObject("ADODB.Recordset")
	ConnFF.ConnectionString = gvConnFF
	ConnFF.Open
	strSQL = "select * from AM_FBM010 where cust_cd = '" & custCd & "' and parent_gb = '11' order by fund_cd asc, peer_cd asc"
	Set Rs = ConnFF.Execute(strSQL)

%>
<html>
<head>
<meta http-equiv="Content-Type" content="application/vnd.ms-excel; charset=utf-8" />
<style type="text/css">
body, table, tr, td {
	font-family:돋움, seoul, arial, verdana;
	font-size:12px;
	line-height:120%;
}
</style>
</head>
<body>
	<table  cellpadding="0" cellspacing="0">
		<thead>
			<tr>
				<th>고객번호</th>
				<th>펀드코드</th>
				<th>펀드명</th>
				<th>펀드유형</th>
				<th>최초투자일</th>
				<th>투자풀구분</th>
				<th>운용사</th>
				<th>판매사</th>
			</tr>
		</thead>
		<tbody>
<%  
	If Rs.BOF Or Rs.EOF Then 
%>
			<tr>
				<td colspan = "8"> 데이타가 존재하지 않습니다. </td>
			</tr>
<%
	else
		Do While Not Rs.eof
%>
			<tr>
				<td><%=Rs("CUST_CD")%></td>
				<td><%=Rs("FUND_CD")%></td>
				<td><%=Rs("FUND_NM")%></td>
				<td><%=Rs("PEER_CD")%></td>
				<td><%=Rs("FST_TRD_DT")%></td>
				<td><%=Rs("INVST_POOL_GB")%></td>
				<td><%=Rs("CO_NM")%></td>
				<td><%=Rs("SELL_CO_NM")%></td>
			</tr>
<%	
			Rs.Movenext
		loop	
	End if
%>	
		</tbody>
	</table>

<%
	Rs.Close
	Set Rs = Nothing
	ConnFF.Close
	Set ConnFF = Nothing
%>	
</body>
</html>