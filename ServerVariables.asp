<TABLE>
  <TR>
    <TD><B>Server Varriable</B></TD>
    <TD><B>Value</B></TD>
  </TR>
 
  <%

  For Each name In Request.ServerVariables

    %>
    <TR>
         <TD><%= name %></TD>
         <TD><%= Request.ServerVariables(name) %></TD>
    </TR>
    <%

  Next

  %>
</TABLE>



<p>111 <%=Request.ServerVariables("HTTP_REFERER") %> </p>