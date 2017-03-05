<template>
	<ol class="progress">
		<li data-step="1" :class="{'is-complete': !onPhaseUpload(), 'is-active': onPhaseUpload()}">
			<span>UPLOAD</span>
		</li>
		<li data-step="2" :class="{'is-complete': !onPhaseUpload() && !onPhaseRoute(), 'is-active': onPhaseRoute()}">
			<span>ROUTE</span>
		</li>
		<li data-step="3" :class="{'is-complete': !onPhaseUpload() && !onPhaseRoute() && !onPhaseExport(), 'is-active': onPhaseExport()}">
			<span>DISPATCH</span>
		</li>
		<li data-step="4" :class="{'is-complete': !onPhaseUpload() && !onPhaseRoute() && !onPhaseExport() && !onPhaseJenny(), 'is-active': onPhaseJenny()}">
			<span>RUN JENNY</span>
		</li>
		<li data-step="5" class="progress__last">
			<span>CONVERSATIONS</span>
		</li>
	</ol>
</template>

<script lang="babel">

	export default {
		store: ['phase']
	}

</script>

<style scoped lang="css">

.progress {
  list-style: none;
  margin: 0;
  padding: 0;
  display: table;
  table-layout: fixed;
  width: 100%;
  color: #849397;
}
.progress > li {
  position: relative;
  display: table-cell;
  text-align: center;
  font-size: 0.8em;
}
.progress > li span {
  display: block;
	font-weight: bold;
  margin-top: -50px;
}
.progress > li:before {
  content: attr(data-step);
  display: block;
  margin: 0 auto;
  background: #000;
	font-size: 12px;
  border: 1px solid gray;
  width: 2.3em;
  height: 2.3em;
  text-align: center;
  margin-bottom: 0.25em;
  line-height: 2.3em;
  border-radius: 100%;
  position: relative;
	-webkit-transition: all ease 2.8s;
	-moz-transition: all ease 2.8s;
	transition: all ease 2.8s;
  z-index: 1000;
}
.progress > li:after {
  content: '';
  position: absolute;
  display: block;
  background: transparent;
	border-top: 1px solid gray;
	border-bottom: 1px solid gray;
	-webkit-transition: all ease 2.8s;
	-moz-transition: all ease 2.8s;
	transition: all ease 2.8s;
  width: 100%;
  height: 0.3em;
  top: 1.0em;
  left: 50%;
  margin-left: 1.5em\9;
  z-index: -1;
}
.progress > li:last-child:after {
  display: none;
}
.progress > li.is-complete {
  color: #fff;
}
.progress > li.is-complete:before, .progress > li.is-complete:after {
  color: #FFF;
	border: 0px !important;
  background: #3498DB;
	-webkit-transition: all ease 2.8s;
	-moz-transition: all ease 2.8s;
	transition: all ease 2.8s;
}
.progress > li.is-active {
  color: #3498DB;
}
.progress > li.is-active span {
  color: #FFDE01;
}
.progress > li.is-active:before {
  color: #FFF;
  background: #3498DB;
	-webkit-transition: all ease 2.8s;
	-moz-transition: all ease 2.8s;
	transition: all ease 2.8s;

}

/**
 * Needed for IE8
 */
.progress__last:after {
  display: none !important;
}

/**
 * Size Extensions
 */
.progress--medium {
  font-size: 1.5em;
}

.progress--large {
  font-size: 2em;
}

/**
 * Some Generic Stylings
 */
*, *:after, *:before {
  box-sizing: border-box;
}

</style>