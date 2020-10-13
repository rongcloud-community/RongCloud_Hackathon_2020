<?xml version="1.0" encoding="utf-8" ?>
<xsl:stylesheet   version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:template match="Data">
		<xsl:apply-templates select="//GS/G"/>
	</xsl:template>
	<xsl:template match="G">
		<div onclick="clickOnEntity(this);" onselectstart="return false" ondragstart="return false">
			<xsl:attribute name="image">img/collapsed.gif</xsl:attribute>
			<xsl:if test="@tag">
			<xsl:attribute name="title">网址:<xsl:value-of select="@tag"/></xsl:attribute>
			</xsl:if>			
			<xsl:attribute name="imageOpen">img/expanded.gif</xsl:attribute>
			<xsl:attribute name="open">false</xsl:attribute>
			<xsl:attribute name="id">tg<xsl:value-of select="@i"/><xsl:if test="@tag"><xsl:value-of select="@tag"/></xsl:if></xsl:attribute>
			<xsl:attribute name="STYLE">cursor: hand;padding-top:3px;</xsl:attribute>
			<xsl:attribute name="oncontextmenu">window.event.cancelBubble = true;return false;</xsl:attribute>
			<table border="0" cellspacing="0" cellpadding="0">
				<tr>						<xsl:attribute name="STYLE">
							padding-left: 7px;font-family: Verdana;font-size: 13px;font-color: white;
						</xsl:attribute>

					<td valign="middle" width="22" nowrap="true">
						<img border="0" id="image">
							<xsl:attribute name="SRC">img/collapsed.gif</xsl:attribute>
						</img>
					</td>
					<td valign="middle" nowrap="true">
						<xsl:value-of select="@t"/>
						<xsl:if test="@c">
						(<xsl:value-of select="@c"/>)
						</xsl:if>
					</td>
				</tr>
			</table>
			 <xsl:apply-templates select="U"/>
		</div>
	</xsl:template>
	<xsl:template match="U">
		<div onclick="ClickUser(this);window.event.cancelBubble = 'true';return false;" style="width:100%">
			<xsl:attribute name="id"><xsl:value-of select="../@i"/>_<xsl:value-of select="@r"/></xsl:attribute>
			<xsl:if test="@tag">
				<xsl:attribute name="title">交流人员:<xsl:value-of select="@tag"/></xsl:attribute>
			</xsl:if>
			<xsl:attribute name="STYLE">padding-left: 8px;cursor: hand;display:none</xsl:attribute>
			<table border="0" cellspacing="0" cellpadding="0" width="100%">
				<tr nowrap="true" width="100%">
				<xsl:attribute name="STYLE">font-family: Verdana;font-size: 13px;font-color: red;</xsl:attribute>
						<td valign="middle" nowrap="true" width="25">
							<xsl:if test="@i">
								<img border="0" id="image">
									<xsl:attribute name="SRC"><xsl:value-of select="@i"/></xsl:attribute>
									<xsl:attribute name="onclick">OpenHistory('<xsl:value-of select="@r"/>');window.event.cancelBubble=true;return false;</xsl:attribute>
									<xsl:if test="@t">
										<xsl:attribute name="title"><xsl:value-of select="@t"/></xsl:attribute>
									</xsl:if>						
								</img>
							</xsl:if>
						</td>
						<td id="caption" nowrap="true">
							<xsl:if test="@rd">
								<xsl:attribute name="STYLE">color:hotpink</xsl:attribute>
							</xsl:if>
							<xsl:value-of select="@tt"/>
							<xsl:if test="@p">
								<xsl:attribute name="STYLE">color:<xsl:value-of select="@pc"/>;font-size:12px</xsl:attribute>
								<b><xsl:value-of select="@p"/></b>
							</xsl:if>							
							<label style="color:red">
								<xsl:choose>
									<xsl:when test="@s='INVITING'">[邀请中]</xsl:when>
									<xsl:when test="@s='LEAVINGMSG'">[留言中]</xsl:when>									
									<xsl:when test="@s='TALKING'">[交谈中]</xsl:when>
									<xsl:when test="@s='OFFTALK'">[已交谈]</xsl:when>
									<xsl:when test="@s='OFFLEAVINGMSG'">[已留言]</xsl:when>
									<xsl:when test="@s='REJECT'">[已拒绝]</xsl:when>
								</xsl:choose>							
							</label>
						</td>						
				</tr>
			</table>
		</div>
	</xsl:template>	
	<xsl:template match="H">
		<div onclick="ClickHost(this);window.event.cancelBubble = 'true';return false;" style="width:100%">
			<xsl:attribute name="id"><xsl:value-of select="@i"/></xsl:attribute>
			<xsl:attribute name="STYLE">padding-left: 8px;cursor: hand;display:none</xsl:attribute>
			<table border="0" cellspacing="0" cellpadding="0" width="100%">
				<tr nowrap="true" width="100%">
				<xsl:attribute name="STYLE">font-family: Verdana;font-size: 13px;font-color: red;</xsl:attribute>
						<td valign="middle" nowrap="true" width="25">
							<img border="0" id="image">
								<xsl:attribute name="SRC"><xsl:value-of select="@i"/></xsl:attribute>
							</img>
						</td>
						<td id="caption" nowrap="true">
							<xsl:value-of select="@n"/>
						</td>						
				</tr>
			</table>
		</div>
	</xsl:template>	
</xsl:stylesheet>
