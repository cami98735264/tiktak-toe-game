<script>
	let isActive = true;
</script>

<style>
	.toggle-wrapper {
		padding: 10px 20px;
		border-radius: 8px;
		display: inline-block;
		cursor: pointer;
		user-select: none;
		font-size: var(--font-size-small);
	}

	span {
		color: var(--primary-content);
		text-shadow: var(--shadow-border-medium);
		transition: all 0.3s ease;
		padding: 0 4px;
	}

	/* Base colors */

	/* Active selection overrides color */
	.active {
		color: var(--secondary) !important;
	}
</style>

<div class="toggle-wrapper" onclick={() => isActive = !isActive}>
	<span class="activar {isActive ? 'active' : 'inactive'}">Activar</span>
	<span> / </span>
	<span class="desactivar {!isActive ? 'active' : 'inactive'}">Desactivar</span>
</div>
