# Ruby 3.2 removed Object#tainted?/#untaint, which old Liquid (pinned by the
# github-pages gem) still calls. This restores them as harmless no-ops.
#
# Loaded directly from the Gemfile (not via _plugins) because the
# github-pages gem forces Jekyll's "safe mode" on every build, which disables
# the _plugins directory entirely regardless of local _config.yml settings.
module TaintCompat
  def tainted?
    false
  end

  def untaint
    self
  end
end

Object.include(TaintCompat)
